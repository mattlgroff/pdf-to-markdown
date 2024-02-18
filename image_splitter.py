import os
from pdf2image import convert_from_path

def pdf_to_images(pdf_path, dpi=300, output_folder="page_jpegs"):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
        
    print(f"Converting PDF to images with DPI={dpi}...")
    images = convert_from_path(pdf_path, dpi=dpi, fmt='jpeg')
    total_pages = len(images)
    digits = len(str(total_pages))

    for i, image in enumerate(images):
        image_path = os.path.join(output_folder, f"Page_{str(i+1).zfill(digits)}.jpeg")
        image.save(image_path, "JPEG")
        print(f"Page {i+1} saved as image: {image_path}")

if __name__ == "__main__":
    pdf_path = "convert-me-to-markdown.pdf"
    pdf_to_images(pdf_path)
    print("PDF conversion to JPEG images complete.")
