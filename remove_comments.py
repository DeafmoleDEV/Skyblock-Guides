import os
import re

def remove_comments_from_code(text, is_html=False):
    if is_html:
        # Match HTML comments: <!-- ... -->
        pattern = re.compile(r'<!--[\s\S]*?-->')
        return pattern.sub('', text)
    else:
        # Match JS/JSX/CSS strings or comments
        # Strings: "...", '...', `...`
        # Comments: /* ... */, // ...
        pattern = re.compile(r'("(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'|`(?:\\.|[^`\\])*`)|(/\*[\s\S]*?\*/|//.*)')
        
        def replacer(match):
            if match.group(1):
                return match.group(1) # It's a string, keep it
            else:
                return "" # It's a comment, remove it
                
        return pattern.sub(replacer, text)

def process_directory(directory):
    # Directories to exclude
    exclude_dirs = {'node_modules', 'dist', '.git', '.gemini', '.github'}
    # File extensions to process
    target_exts = {'.js', '.jsx', '.css', '.html'}

    for root, dirs, files in os.walk(directory):
        # Modify dirs in-place to skip excluded directories
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in target_exts:
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    is_html = (ext == '.html')
                    new_content = remove_comments_from_code(content, is_html)
                    
                    if content != new_content:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Removed comments from: {filepath}")
                except Exception as e:
                    print(f"Error processing {filepath}: {e}")

if __name__ == '__main__':
    project_root = '.'
    print("Starting comment removal...")
    process_directory(project_root)
    print("Comment removal complete.")
