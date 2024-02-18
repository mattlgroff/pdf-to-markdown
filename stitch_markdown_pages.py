import os
import re

def sort_files_naturally(files):
    """Sort the files in natural order to handle the numbering correctly."""
    convert = lambda text: int(text) if text.isdigit() else text.lower()
    alphanum_key = lambda key: [convert(c) for c in re.split('([0-9]+)', key)]
    return sorted(files, key=alphanum_key)

def stitch_markdown_pages(markdown_dir, output_file):
    """Combine markdown files from a directory into a single markdown file."""
    files = os.listdir(markdown_dir)
    sorted_files = sort_files_naturally(files)
    
    with open(output_file, 'w', encoding='utf-8') as outfile:
        for filename in sorted_files:
            if filename.endswith('.md'):
                page_number = filename.split('_')[1].split('.')[0]
                with open(os.path.join(markdown_dir, filename), 'r', encoding='utf-8') as infile:
                    content = infile.read()
                    outfile.write(f"# Page {page_number}\n\n{content}\n\n")

if __name__ == "__main__":
    markdown_dir = 'cleaned_page_markdowns'
    output_file = 'converted-pdf.md'
    stitch_markdown_pages(markdown_dir, output_file)
    print(f"All cleaned markdown pages have been stitched together into {output_file}.")
