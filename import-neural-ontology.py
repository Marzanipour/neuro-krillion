"""Build the attributed anatomy supplement from Uberon's nervous-minimal OBO.
Usage: python3 import-neural-ontology.py /path/to/nervous-minimal.obo
Only non-obsolete, human-subset neural structures with familiar anatomical
labels are selected. Side duplicates and abstract grouping terms are excluded.
"""
import hashlib,json,re,sys
from pathlib import Path
raw=Path(sys.argv[1]).read_bytes();terms={}
for block in raw.decode().split('[Term]')[1:]:
    term={}
    for line in block.splitlines():
        if ': ' in line:
            k,v=line.split(': ',1);term.setdefault(k,[]).append(v)
    if 'id' in term and 'is_obsolete' not in term:terms[term['id'][0]]=term

def parents(term):
    return [x.split()[0] for x in term.get('is_a',[])]+[x.split()[1] for x in term.get('relationship',[]) if x.startswith('part_of ')]
neural={'UBERON:0001016'}
while True:
    found={id for id,t in terms.items() if id.startswith('UBERON:') and any(p in neural for p in parents(t))}
    previous=len(neural);neural|=found
    if len(neural)==previous:break
keywords=re.compile(r'brain|cortex|cortical|nucleus|nerve|tract|ganglion|gyrus|sulcus|commissure|ventricle|cerebell|hippocamp|thalam|colliculus|amygdal|striat|putamen|caudate|pallid|medulla|pons|bulb|chiasm|lemniscus|reticular|substantia|fasciculus|pyramid|retina|diencephalon|telencephalon|hypophysis|pineal',re.I)
reject=re.compile(r'\bleft\b|\bright\b|regional part|anatomical entity|obsolete|developing|anlage|embryonic|primordium|neuromere|rhombomere|layer [0-9ivx]|lamina [0-9ivx]|layer of|layer [a-z]|part of|segment of|zone of|wall of|floor of|roof of|ventricular part|dorsal part|ventral part',re.I)
answers=[]
for id,t in terms.items():
    name=t['name'][0]
    if id not in neural or len(name)>65 or not keywords.search(name) or reject.search(name):continue
    if not any(s in ['human_subset','human_reference_atlas'] for s in t.get('subset',[])):continue
    exact=[]
    for syn in t.get('synonym',[]):
        match=re.match(r'"([^"\\]+)" EXACT',syn)
        if match and 2<len(match[1])<=65:exact.append(match[1])
    p=next((terms[x]['name'][0] for x in parents(t) if x in terms and x in neural),'nervous system')
    answers.append({'name':name[0].upper()+name[1:],'points':85,'explanation':f'A nervous-system structure grouped under {p} in Uberon.','aliases':exact,'source':'https://purl.obolibrary.org/obo/'+id.replace(':','_'),'ontologyId':id})
answers.sort(key=lambda a:a['name'].casefold())
metadata={'name':'Uberon nervous-system anatomy subset','url':'https://purl.obolibrary.org/obo/uberon/nervous-minimal.obo','license':'CC BY 3.0','sha256':hashlib.sha256(raw).hexdigest(),'selected':len(answers)}
Path('bank-anatomy.js').write_text('// Derived from Uberon, CC BY 3.0. See UBERON-LICENSE.txt and THIRD-PARTY.md.\nexport const ANATOMY_SOURCE = '+json.dumps(metadata,ensure_ascii=False)+';\nexport const ANATOMY_ANSWERS = '+json.dumps(answers,ensure_ascii=False,indent=1)+';\n')
print(metadata)
