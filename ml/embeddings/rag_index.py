import json
import os
from pathlib import Path
from typing import List, Optional

import numpy as np
from dotenv import load_dotenv
from openai import OpenAI

try:
    import faiss
except ImportError as e:
    raise ImportError("faiss is not installed. Run: python -m pip install faiss-cpu") from e

from utils import scrape_india_code, chunk_text

ENV_PATH = Path(__file__).resolve().parents[1] / ".env"
load_dotenv(dotenv_path=ENV_PATH)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise RuntimeError(f"OPENAI_API_KEY not found in {ENV_PATH}")

client = OpenAI(api_key=OPENAI_API_KEY)
EMBED_MODEL = "text-embedding-3-small"

BASE_DIR = Path(__file__).resolve().parent
INDEX_PATH = BASE_DIR / "faiss.index"
META_PATH = BASE_DIR / "chunks.json"


def get_embedding(text: str, model: str = EMBED_MODEL) -> Optional[List[float]]:
    text = (text or "").strip()
    if not text:
        return None
    try:
        resp = client.embeddings.create(model=model, input=text)
        return resp.data[0].embedding
    except Exception as e:
        print(f"Embedding failed: {e}")
        return None


def read_local_text(path: Path) -> str:
    if not path.exists():
        print(f"Local file not found: {path}")
        return ""
    return path.read_text(encoding="utf-8", errors="ignore")


def build_index(india_code_urls: List[str], local_txt_files: List[Path]) -> None:
    all_chunks: List[str] = []

    # 1) Try URLs
    for url in india_code_urls:
        print(f"Scraping: {url}")
        text = scrape_india_code(url)
        if text:
            all_chunks.extend(chunk_text(text, chunk_size=1000, chunk_overlap=50))
        else:
            print(f"Skipping {url}: no text extracted")

    # 2) Fallback / supplement from local files
    for fp in local_txt_files:
        print(f"Reading local file: {fp}")
        text = read_local_text(fp)
        if text:
            all_chunks.extend(chunk_text(text, chunk_size=1000, chunk_overlap=50))
        else:
            print(f"Skipping {fp}: empty or unreadable")

    if not all_chunks:
        raise RuntimeError("No text chunks were created from URLs or local files.")

    print(f"Generating embeddings for {len(all_chunks)} chunks...")
    embeddings = [get_embedding(c) for c in all_chunks]
    valid = [(c, e) for c, e in zip(all_chunks, embeddings) if e is not None]
    if not valid:
        raise RuntimeError("Embedding generation failed for all chunks.")

    all_chunks, embeddings = zip(*valid)
    vectors = np.array(embeddings, dtype="float32")

    index = faiss.IndexFlatL2(vectors.shape[1])
    index.add(vectors)

    faiss.write_index(index, str(INDEX_PATH))
    with open(META_PATH, "w", encoding="utf-8") as f:
        json.dump(list(all_chunks), f, ensure_ascii=False, indent=2)

    print(f"Index saved: {INDEX_PATH}")
    print(f"Chunks saved: {META_PATH}")
    print(f"Total indexed chunks: {len(all_chunks)}")


if __name__ == "__main__":
    india_code_urls = [
        "https://www.indiacode.nic.in/handle/123456789/8774?view_type=search&col=123456789/1362"
    ]

    # Put your act text here first (create this file)
    local_txt_files = [
        Path(__file__).resolve().parents[1] / "data" / "bns.txt"
    ]

    build_index(india_code_urls, local_txt_files)