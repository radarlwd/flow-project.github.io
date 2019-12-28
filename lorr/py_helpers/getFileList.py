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
     	content += "\"" + str(f)[3:] + '\", ' + os.linesep
     #a.write(str(f) + ', ' + os.linesep)
content = content[:-3]
content += "]"
a.write("// A way get a value from another .js file is saving the variable in the browser\n")
a.write(content+';\n')
#a.write("localStorage.setItem(\"fileList\",fileList);")

a.write("\n// metrics filenames\n")
content = "METRICS_FILE_LIST = ["
# write a filenames of metric as a variable
for path, subdirs, files in os.walk(metrics_path):
   for filename in files:
     f = os.path.join(path, filename)
     if str(f)[-3:] == "csv":
     	content += "\"" + str(f)[3:] + '\", ' + os.linesep
     #a.write(str(f) + ', ' + os.linesep)
content = content[:-3]
content += "]"
#a.write("// A way to get a value from another .js file is saving the variable in the browser\n")
a.write(content+';\n')
#a.write("localStorage.setItem(\"fileList\",fileList);")
a.close()

