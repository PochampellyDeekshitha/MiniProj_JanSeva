# ml/embeddings/utils.py
import requests
from bs4 import BeautifulSoup
try:
    from langchain_text_splitters import RecursiveCharacterTextSplitter
except ImportError:
    # Fallback for older LangChain installs
    from langchain.text_splitter import RecursiveCharacterTextSplitter
def scrape_india_code(url):
    """
    Scrapes main text content from IndiaCode URL.
    """
    resp = requests.get(url)
    if resp.status_code != 200:
        print(f"Failed to fetch {url}")
        return ""
    
    soup = BeautifulSoup(resp.text, "html.parser")
    # Update this selector if IndiaCode changes structure
    content_div = soup.find("div", {"id": "content"})
    if not content_div:
        print(f"No content found for {url}")
        return ""
    
    text = content_div.get_text(separator="\n")
    return text

def chunk_text(text, chunk_size=1000, chunk_overlap=50):
    """
    Splits long text into chunks suitable for embeddings.
    """
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap
    )
    return splitter.split_text(text)