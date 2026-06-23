import re

with open('src/app/[locale]/reservation/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

count = content.count('<motion.div whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2, z: 20 }} transition={{ type: \'spring\', stiffness: 300, damping: 20 }}>')
print('Found:', count)

new_content = content.replace(
    '<motion.div whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2, z: 20 }} transition={{ type: \'spring\', stiffness: 300, damping: 20 }}>',
    '<motion.div className="flex flex-col w-full" whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2, z: 20 }} transition={{ type: \'spring\', stiffness: 300, damping: 20 }}>'
)

with open('src/app/[locale]/reservation/page.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Replaced!')
