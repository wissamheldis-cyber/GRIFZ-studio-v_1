import re

with open('src/app/[locale]/reservation/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

def replacer(match):
    motion_open = match.group(1)
    glass = match.group(2)
    button_div = match.group(3)
    motion_close = match.group(4)

    new_motion_open = motion_open.replace('className="flex flex-col w-full"', 'className="w-full"')
    
    return f'<div className="flex flex-col items-center w-full">\n                {new_motion_open}\n{glass}\n                </motion.div>\n{button_div}\n              </div>'

pattern = re.compile(
    r'(<motion\.div className=\"flex flex-col w-full\" whileHover=\{\{ scale: 1\.02, rotateX: 2, rotateY: -2, z: 20 \}\} transition=\{\{ type: \'spring\', stiffness: 300, damping: 20 \}\}>)\s*(<GlassPanel.*?</GlassPanel>)\s*(<div className=\"flex justify-center w-full mt-10 mb-10 px-4 md:px-0\">.*?</div>)\s*(</motion\.div>)',
    re.DOTALL
)

count = len(pattern.findall(content))
print("Found:", count)

new_content = pattern.sub(replacer, content)

with open('src/app/[locale]/reservation/page.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Replaced!")
