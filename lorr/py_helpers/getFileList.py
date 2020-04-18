# Whenever updating new data files for visualization. Run this program to automatically update the
# variables FILE_LIST and METRICS_FILE_LIST in file_list.js.
# This program gets the list of all files in the specified "raw_data_path" and "metrics_path" and
# writes them onto the file located in "output_file" such that the variables "FILE_LIST"(array) and 
# "METRICS_FILE_LIST"(array) get these paths as their elements.
#
# After running this program, the "output_file" should look like the following:
#
# FILE_LIST = ["./data/raw_data/IDM_AVRider_PI--15IDM_7PI--EVEN.csv", 
# 	       "./data/raw_data/IDM_AVRider_MLYAU2--0IDM_22MLYAU2--platooned.csv"];
# 
# METRICS_FILE_LIST = ["./data/metrics/Big_19IDM_3LACC--EVEN.csv", 
#		       "./data/metrics/Big_3IDM_19MLYAU1--platooned.csv"];

import os

output_file = "../js/file_list.js"

raw_data_path = r'../data/raw_data'
metrics_path = r'../data/metrics'

a = open(output_file, "w")
content = "FILE_LIST = ["
for path, subdirs, files in os.walk(raw_data_path):
   for filename in files:
     f = os.path.join(path, filename)
     if str(f)[-3:] == "csv":
     	content += "\"./" + str(f)[3:] + '\", ' + os.linesep
     #a.write(str(f) + ', ' + os.linesep)
content = content[:-3]
content += "]"
a.write("// Save the path to each files in " + raw_data_path + " and " + metrics_path +  "\n")
a.write(content+';\n')
#a.write("localStorage.setItem(\"fileList\",fileList);")

a.write("\n// metrics filenames\n")
content = "METRICS_FILE_LIST = ["
# write a filenames of metric as a variable
for path, subdirs, files in os.walk(metrics_path):
   for filename in files:
     f = os.path.join(path, filename)
     if str(f)[-3:] == "csv":
     	content += "\"./" + str(f)[3:] + '\", ' + os.linesep
     #a.write(str(f) + ', ' + os.linesep)
content = content[:-3]
content += "]"
a.write(content+';\n')
#a.write("localStorage.setItem(\"fileList\",fileList);")
a.close()

