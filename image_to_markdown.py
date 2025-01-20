import os
import base64
from openai import OpenAI
from pathlib import Path
from dotenv import load_dotenv


load_dotenv()
client = OpenAI()

api_key = os.environ.get("OPENAI_API_KEY")


def encode_image_to_base64(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")


def image_to_markdown(base64_image):
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Give me the markdown text output from this page in a PDF using formatting to match the structure of the page as close as you can get. Only output the markdown and nothing else. Do not explain the output, just return it. Do not use a single # for a heading. All headings will start with ## or ###. Convert tables to markdown tables. Describe charts as best you can. DO NOT return in a codeblock. Just return the raw text in markdown format.",
                    },
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"},
                    },
                ],
            }
        ],
        max_tokens=4096,
    )
    return response.choices[0].message.content


def process_images_to_markdown(
    image_folder="page_jpegs", output_folder="page_markdowns"
):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    images = sorted(Path(image_folder).iterdir(), key=lambda x: x.stem)
    for image_path in images:
        print(f"Processing {image_path.name}...")
        base64_image = encode_image_to_base64(str(image_path))
        markdown_content = image_to_markdown(base64_image)
        output_path = Path(output_folder) / f"{image_path.stem}.md"
        with open(output_path, "w") as f:
            f.write(markdown_content)
            print(f"Markdown for {image_path.name} saved to {output_path}")


if __name__ == "__main__":
    process_images_to_markdown()
    print("All images converted to markdown.")
