import sys
import os
from moviepy.editor import ImageSequenceClip
from PIL import Image, ImageOps 

def create_reel(folder_path, output_path):
    valid_extensions = ('.jpg', '.jpeg', '.png')
    files = [os.path.join(folder_path, f) for f in sorted(os.listdir(folder_path)) 
             if f.lower().endswith(valid_extensions)]
    
    if not files:
        print("Error: No images found")
        return

    target_size = (1080, 1920)
    processed_files = []

    for img_path in files:
        try:
            with Image.open(img_path) as img:
                if img.mode != 'RGB':
                    img = img.convert('RGB')

                img_resized = ImageOps.pad(img, target_size, method=Image.Resampling.LANCZOS, color='black')
                
                img_resized.save(img_path)
                processed_files.append(img_path)
        except Exception as e:
            print(f"Warning: Skipping bad image {img_path}: {e}")

    if processed_files:
        clip = ImageSequenceClip(processed_files, fps=1)
        
        clip.write_videofile(output_path, codec="libx264", audio=False, fps=24, preset='ultrafast')
    else:
        print("Error: Could not process any images")

def create_thumbnail(thumbnail_path):
    try:
        with Image.open(thumbnail_path) as img:
            if img.mode != 'RGB':
                img = img.convert('RGB')

            img_resized = ImageOps.pad(img, (1080, 1920), method=Image.Resampling.LANCZOS, color='black')
            img_resized.save(thumbnail_path)
    except Exception as e:
        print(f"Error creating thumbnail: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python video_maker.py <input_folder> <output_file>")
    else:
        path_to_images = sys.argv[1]
        save_to = sys.argv[2]
        create_reel(path_to_images, save_to)

        save_thumbnail = sys.argv[3]
        create_thumbnail(save_thumbnail)