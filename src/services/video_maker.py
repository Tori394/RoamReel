import sys
import os
from moviepy.editor import ImageSequenceClip
from PIL import Image, ImageOps 
import concurrent.futures 

TARGET_SIZE = (1080, 1920)

def process_single_image(img_path):
    """
    Funkcja przetwarzająca jedno zdjęcie.
    Musi być poza główną funkcją, aby działała w multiprocessingu.
    """
    try:
        with Image.open(img_path) as img:
            if img.mode != 'RGB':
                img = img.convert('RGB')

            img_resized = ImageOps.pad(img, TARGET_SIZE, method=Image.Resampling.BICUBIC, color='black')
            
            img_resized.save(img_path, quality=90)
            return img_path
    except Exception as e:
        print(f"Warning: Skipping bad image {img_path}: {e}")
        return None

def create_reel(folder_path, output_path):
    valid_extensions = ('.jpg', '.jpeg', '.png')
    files = [os.path.join(folder_path, f) for f in sorted(os.listdir(folder_path)) 
             if f.lower().endswith(valid_extensions)]
    
    if not files:
        return

    processed_files = []

    # ProcessPoolExecutor automatycznie dobiera liczbę procesów do liczby rdzeni
    with concurrent.futures.ProcessPoolExecutor() as executor:
        results = list(executor.map(process_single_image, files))

    processed_files = [f for f in results if f is not None]

    fps = 30 / len(processed_files) if processed_files else 0

    if processed_files:
        print("Rendering video...")
        clip = ImageSequenceClip(processed_files, fps=fps)
        
        clip.write_videofile(
            output_path, 
            codec="libx264", 
            audio=False, 
            fps=24, 
            preset='ultrafast',
            threads=4
        )
    else:
        print("Error: Could not process any images")

def create_thumbnail(thumbnail_path):
    try:
        with Image.open(thumbnail_path) as img:
            if img.mode != 'RGB':
                img = img.convert('RGB')

            img_resized = ImageOps.pad(img, TARGET_SIZE, method=Image.Resampling.BICUBIC, color='black')
            img_resized.save(thumbnail_path, quality=90)
    except Exception as e:
        print(f"Error creating thumbnail: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python video_maker.py <input_folder> <output_file>")
    else:
        path_to_images = sys.argv[1]
        save_to = sys.argv[2]
        
        create_reel(path_to_images, save_to)

        if len(sys.argv) > 3:
            save_thumbnail = sys.argv[3]
            create_thumbnail(save_thumbnail)