import json
import os
from pathlib import Path
from typing import List

import faiss
import numpy as np
from dotenv import load_dotenv
from openai import OpenAI

# Paths
BASE_DIR = Path(__file__).resolve().parent
ENV_PATH = BASE_DIR.parents[0] / ".env"   # ml/.env
INDEX_PATH = BASE_DIR / "faiss.index"
CHUNKS_PATH = BASE_DIR / "chunks.json"

# Load .env
load_dotenv(dotenv_path=ENV_PATH)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise RuntimeError(f"OPENAI_API_KEY not found in {ENV_PATH}")

client = OpenAI(api_key=OPENAI_API_KEY)

EMBED_MODEL = "text-embedding-3-small"  # must match indexing model
CHAT_MODEL = "gpt-4.1"


def load_index_and_chunks():
    if not INDEX_PATH.exists():
        raise FileNotFoundError(f"FAISS index not found: {INDEX_PATH}")
    if not CHUNKS_PATH.exists():
        raise FileNotFoundError(f"Chunks file not found: {CHUNKS_PATH}")

    index = faiss.read_index(str(INDEX_PATH))
    with open(CHUNKS_PATH, "r", encoding="utf-8") as f:
        chunks = json.load(f)

    return index, chunks


def embed_text(text: str) -> List[float]:
    resp = client.embeddings.create(model=EMBED_MODEL, input=text)
    return resp.data[0].embedding


def query_rag(question: str, top_k: int = 5) -> str:
    index, chunks = load_index_and_chunks()

    q_emb = embed_text(question)
    q_vector = np.array([q_emb], dtype="float32")
    distances, indices = index.search(q_vector, top_k)

    selected_chunks = []
    for i in indices[0]:
        if 0 <= i < len(chunks):
            selected_chunks.append(chunks[i])

    context = "\n\n---\n\n".join(selected_chunks)

    prompt = f"""You are a legal assistant.
Answer using only the provided context. If not present, say you don't know.

Context:
{context}

Question: {question}
"""

    response = client.chat.completions.create(
        model=CHAT_MODEL,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
    )

    return response.choices[0].message.content or ""


if __name__ == "__main__":
    q = "What is the punishment for cheating under Bharatiya Nyaya Sanhita?"
    answer = query_rag(q, top_k=5)
    print("\nAnswer:\n")
    print(answer)