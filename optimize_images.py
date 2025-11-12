#!/usr/bin/env python3
"""
Image optimization script to reduce file sizes for web
"""
import os
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("PIL/Pillow not installed. Installing...")
    os.system("pip3 install Pillow --quiet")
    from PIL import Image

def optimize_image(input_path, output_path=None, quality=85, max_size=(1920, 1080)):
    """
    Optimize image by resizing and compressing
    """
    if output_path is None:
        output_path = input_path
    
    try:
        img = Image.open(input_path)
        
        # Get original size
        original_size = os.path.getsize(input_path)
        
        # Resize if too large
        if img.size[0] > max_size[0] or img.size[1] > max_size[1]:
            img.thumbnail(max_size, Image.Resampling.LANCZOS)
        
        # Save optimized image
        if input_path.lower().endswith('.png'):
            # Convert PNG to optimized format
            if img.mode in ('RGBA', 'LA', 'P'):
                # Keep transparency
                img.save(output_path, 'PNG', optimize=True, compress_level=9)
            else:
                # Convert to JPEG for better compression
                if img.mode != 'RGB':
                    img = img.convert('RGB')
                jpeg_path = output_path.replace('.png', '.jpg')
                img.save(jpeg_path, 'JPEG', quality=quality, optimize=True)
                print(f"Converted {input_path} to {jpeg_path}")
                return jpeg_path
        else:
            # JPEG optimization
            if img.mode != 'RGB':
                img = img.convert('RGB')
            img.save(output_path, 'JPEG', quality=quality, optimize=True)
        
        new_size = os.path.getsize(output_path)
        reduction = ((original_size - new_size) / original_size) * 100
        print(f"Optimized {input_path}: {original_size/1024:.1f}KB -> {new_size/1024:.1f}KB ({reduction:.1f}% reduction)")
        
        return output_path
    except Exception as e:
        print(f"Error optimizing {input_path}: {e}")
        return None

def main():
    images_dir = Path("assets/images")
    
    # Large PNG files to optimize
    png_files = [
        "COMUNITY SERVOCE .png",
        "ANNUALDRAMA.png",
        "interschoolsports.png",
        "annualscience.png",
        "taekwondo.png",
        "skating1.png",
        "culturalheritage.png",
        "NATIOANL_ACADEMIC_AWARDS.png",
        "current students.png",
        "homescience.png",
        "skating.png",
        "smallclasssize.png"
    ]
    
    # JPEG files to optimize
    jpeg_files = [
        "caro1.jpeg",
        "caro2.jpeg",
        "caro3.jpeg",
        "caro4.jpeg",
        "caro5.jpeg",
        "hero11.jpeg"
    ]
    
    print("Starting image optimization...")
    print("=" * 50)
    
    # Optimize PNG files
    for png_file in png_files:
        file_path = images_dir / png_file
        if file_path.exists():
            optimize_image(str(file_path), max_size=(1920, 1080), quality=85)
        else:
            print(f"File not found: {file_path}")
    
    # Optimize JPEG files
    for jpeg_file in jpeg_files:
        file_path = images_dir / jpeg_file
        if file_path.exists():
            optimize_image(str(file_path), max_size=(1920, 1080), quality=85)
        else:
            print(f"File not found: {file_path}")
    
    print("=" * 50)
    print("Image optimization complete!")

if __name__ == "__main__":
    main()

