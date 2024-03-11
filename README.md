# PDF to Markdown Utility

This utility converts PDF documents to Markdown format, leveraging the capabilities of OpenAI's GPT-4 Vision model for image-based content recognition and conversion. It's designed to handle the conversion process in multiple steps for enhanced accuracy and scalability.

Note: the included `convert-me-to-markdown.pdf` is a sample PDF made by saving the following article as a PDF: [How to Successfully Scale Generative AI in Pharma](https://www.bain.com/insights/how-to-successfully-scale-generative-ai-in-pharma/)

The final stitched output can be found in `converted-pdf.md`.

## Workflow Overview

1. **PDF to Image Conversion (`image_splitter.py`)**: Converts each page of the input PDF into separate JPEG images, storing them in a folder named `page_jpegs`. Each image is named sequentially (`Page_1.jpeg`, `Page_2.jpeg`, etc.).

2. **Image to Markdown Conversion (`image_to_markdown.py`)**: Processes the images from `page_jpegs` through OpenAI's GPT-4 Vision model, generating corresponding Markdown text. The Markdown for each page is saved in the `page_markdowns` folder (`Page_1.md`, `Page_2.md`, etc.).

3. **Cleanup Markdown (`cleanup_markdown.py`)**: Cleans up the Markdown files in `page_markdowns` by removing irrelevant content, enhancing readability. Cleaned Markdown files are saved in a new folder called `cleaned_page_markdowns`.

4. **Stitch Markdown Pages (`stitch_markdown_pages.py`)**: Combines all Markdown files from `cleaned_page_markdowns` into a single Markdown document (`converted-pdf.md`), with page numbers inserted before each page's content.

5. **Chunker (`chunker.py`)**: Splits the Markdown document into smaller chunks, which we will convert to embeddings in the next step. The chunked Markdown files are saved in a new file called `chunks.csv`.

6. **Embed (`embed.py`)**: Converts the chunks of Markdown into embeddings using OpenAI's ADA 3 Small model. The embeddings are saved in a new file called `chunks_with_embeddings.csv`.

7. **Upload to Supabase (`insert_embeddings_supabase.js`)**: Run your `migrations.sql` migrations in Supabase in the query editor, I suggest doing them one at a time. You will need to `npm install` and then `node insert_embeddings_supabase.js` to insert the embeddings into the `documents` table in Supabase.

## Getting Started

### Prerequisites

- Python 3.12 or newer
- Node.js LTS or newer
- OpenAI API Key: You need an API key from OpenAI to use the GPT-4 Vision model. You can obtain it from your OpenAI account.
- Supabase API Key: You need an API key from Supabase to insert the embeddings into the `documents` table. You can obtain it from your Supabase account.

### Installation

First, ensure you have the required libraries installed:

```bash
pip install pdf2image requests openai
npm install
```

### Usage

The conversion process is divided into two scripts for modularity and ease of use:

#### `image_splitter.py`

This script converts the input PDF (`convert-me-to-markdown.pdf`) into a series of JPEG images, storing them in a folder named `page_jpegs`. Each image corresponds to a page in the PDF and is named sequentially (`Page_1.jpeg`, `Page_2.jpeg`, etc.).

**Example Command:**

```bash
python image_splitter.py
```

#### `image_to_markdown.py`

This script processes the images stored in `page_jpegs`, converting each to Markdown format using OpenAI's GPT-4 Vision model. The Markdown text for each page is saved in a new folder named `page_markdowns`, with each file corresponding to a page in the PDF (`Page_1.md`, `Page_2.md`, etc.).

**Example Command:**

Before running `image_to_markdown.py`, ensure your OpenAI API Key is set as an environment variable:

```bash
export OPENAI_API_KEY='your_api_key_here'
python image_to_markdown.py
```

#### `cleanup_markdown.py`

Cleans up the generated Markdown files.

**Example Command:**

```bash
python cleanup_markdown.py
```

#### `stitch_markdown_pages.py`

Combines all Markdown files from `cleaned_page_markdowns` into a single Markdown document (`converted-pdf.md`), with page numbers inserted before each page's content.

**Example Command:**

```bash
python stitch_markdown_pages.py
```

### Output

The utility produces a single, cleaned Markdown document (converted-pdf.md) derived from the original PDF, ready for use or further processing.

## Note

The utility leverages OpenAI's GPT-4 Vision and GPT-4 Turbo models for image-to-text conversion and text cleanup, ensuring high accuracy in content recognition, Markdown formatting, and content cleanup. The conversion quality may vary based on the complexity of the PDF's layout and the clarity of its images.

This README provides a comprehensive guide on using your PDF to Markdown utility, including the new steps for cleaning up the Markdown content and stitching the pages together into a single document.