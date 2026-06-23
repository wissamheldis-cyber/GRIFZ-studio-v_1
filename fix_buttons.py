import re

with open('src/app/[locale]/reservation/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

def replacer(match):
    prefix = match.group(1) # <GlassPanel...
    price = match.group(2) # <span class=... price ...>
    button = match.group(3) # <MagicButton ... </MagicButton>
    suffix = match.group(4) # </GlassPanel>
    
    return f'{prefix}\n                    {price}\n                  </div>\n                {suffix}\n                <div className="flex justify-end w-full mt-6 px-4 md:px-0">\n                  {button}\n                </div>'

pattern = re.compile(
    r'(<GlassPanel[^>]*>.*?<div className="flex flex-col items-start md:items-end justify-center w-full md:w-auto mt-6 md:mt-0 relative z-10 transition-transform duration-300 group-hover:-translate-x-2">\s*)(<span className="font-serif text-2xl md:text-3xl text-ink italic opacity-70 mb-4">[^<]*</span>)\s*(<MagicButton.*?</MagicButton>)\s*</div>\s*(</GlassPanel>)',
    re.DOTALL
)

new_content = pattern.sub(replacer, content)

with open('src/app/[locale]/reservation/page.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Done')
