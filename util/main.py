# Find unicode of list of characters
accented = "ā,ē,ī,ō,ū,ǖ,á,é,í,ó,ú,ǘ,ǎ,ě,ǐ,ǒ,ǔ,ǚ,à,è,ì,ò,ù,ǜ"
accented = accented.split(",")
codes = []
for i in accented:
    codes.append(ord(i))
print(codes)