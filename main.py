# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.


import os
import shutil


def copy_directory_structure(source_dir, dest_dir):
    # 遍历源目录
    # 遍历源目录
    for root, dirs, files in os.walk(source_dir):
        for dir_name in dirs:
            # 源目录中的文件夹路径
            source_path = os.path.join(root, dir_name)
            # 排除以.assets结尾的文件夹
            if not dir_name.endswith(".assets"):
                # 在目标目录中创建相应的文件夹结构
                dest_path = source_path.replace(source_dir, dest_dir, 1)

                # 创建相应的目录结构
                if not os.path.exists(dest_path):
                    os.makedirs(dest_path)


if __name__ == "__main__":
    source_directory = "F:/project/newLecture/docs"  # 替换为源目录路径
    destination_directory = "F:/Lecture/20240402~0901"  # 替换为目标目录路径

    copy_directory_structure(source_directory, destination_directory)
    print("目录结构复制完成")
