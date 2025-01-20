from openai import OpenAI
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()
client = OpenAI()


def clean_markdown_content(text):
    """
    Sends the markdown text to OpenAI to remove irrelevant content.
    """
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": "You are tasked with cleaning up the following markdown text. You should return only the cleaned up markdown text. Do not explain your output or reasoning. \n remove any irellevant text from the markdown, returning the cleaned up version of the content. Examples include any images []() or 'click here' or 'Listen to this article' or page numbers or logos. ",
            },
            {
                "role": "user",
                "content": text,
            },
        ],
        max_tokens=4096,
    )

    try:
        cleaned_content = (
            response.choices[0].message.content if response.choices else ""
        )
    except AttributeError:
        cleaned_content = "Error in processing image to markdown. Response format may have changed or is invalid."
        print(cleaned_content)

    return cleaned_content


def process_markdown_files(input_directory_path, output_directory_path):
    """
    Iterates through markdown files in the given input directory, cleans their content,
    and saves the cleaned content to a corresponding file in the output directory.
    """
    input_dir = Path(input_directory_path)
    output_dir = Path(output_directory_path)

    # Create the output directory if it doesn't exist
    output_dir.mkdir(parents=True, exist_ok=True)

    if not input_dir.is_dir():
        print(f"The directory {input_directory_path} does not exist.")
        return

    # Sort the files in alphanumeric order before processing
    sorted_files = sorted(input_dir.glob("*.md"), key=lambda path: path.stem)

    for markdown_file in sorted_files:
        print(f"Processing {markdown_file.name}...")
        with open(markdown_file, "r", encoding="utf-8") as file:
            content = file.read()

        cleaned_content = clean_markdown_content(content)

        # Define the path for the cleaned file in the output directory
        cleaned_file_path = output_dir / markdown_file.name
        with open(cleaned_file_path, "w", encoding="utf-8") as file:
            file.write(cleaned_content)
        print(f"Cleaned content saved to {cleaned_file_path}")


if __name__ == "__main__":
    # Specify the path to your markdown files directory and the output directory
    markdown_files_directory = "page_markdowns"
    cleaned_markdown_directory = "cleaned_page_markdowns"
    process_markdown_files(markdown_files_directory, cleaned_markdown_directory)
    print("Markdown cleanup process completed.")
