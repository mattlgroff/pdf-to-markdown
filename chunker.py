import re
import csv
import os

# Define the path to the input file and the output CSV file
input_file_path = "converted-pdf.md"
output_file_path = "chunks.csv"

# Ensure the script and files are in the same directory for this to work correctly
# os.path.abspath(__file__) might not work in this notebook environment but is useful in a standalone script
# current_dir = os.path.dirname(os.path.abspath(__file__))
# input_file_path = os.path.join(current_dir, input_file_path)
# output_file_path = os.path.join(current_dir, output_file_path)

# Read the content of the input markdown file
with open(input_file_path, 'r', encoding='utf-8') as file:
    text = file.read()

# Regular expression to match page headers, section headers, and capture the text
pattern = r"(# Page (\d+)|## .+?\n)(.+?)(?=(\n# Page |\n## |$))"

# Find all matches and organize them into a list of tuples (page_number, section_header, chunk)
matches = re.findall(pattern, text, flags=re.DOTALL)

# Prepare data for CSV
data_for_csv = []
current_page = None
for match in matches:
    if match[1]:  # If this is a page number
        current_page = match[1]
    else:  # This is a chunk
        chunk = match[2].strip()
        data_for_csv.append((current_page, chunk))

# Write data to CSV
with open(output_file_path, mode='w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(["Page Number", "Chunk"])
    writer.writerows(data_for_csv)

print(f"CSV file has been created: {output_file_path}")
