import sys
import os
from moviepy.editor import ImageSequenceClip

def create_reel(folder_path, output_path):
    files = [os.path.join(folder_path, f) for f in sorted(os.listdir(folder_path))]
    
    clip = ImageSequenceClip(files, fps=1)
    
    clip.write_videofile(output_path, codec="libx264", audio=False)

if __name__ == "__main__":
    path_to_images = sys.argv[1]
    save_to = sys.argv[2]
    create_reel(path_to_images, save_to)