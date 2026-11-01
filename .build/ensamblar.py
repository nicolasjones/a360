import hashlib, json, os, sys
B = os.path.dirname(os.path.abspath(__file__))
R = os.path.dirname(B)
man = json.load(open(os.path.join(B, 'manifest.json')))
def salida(v):
    o = os.environ.get('GITHUB_OUTPUT')
    if o:
        open(o, 'a').write('listo=' + v + '\n')
    print('listo=' + v)
nombres = {dest: ['%s.%03d.txt' % (f['stem'], i) for i in range(f['parts'])] for dest, f in man.items()}
faltan = [n for ns in nombres.values() for n in ns if not os.path.exists(os.path.join(B, 'parts', n))]
if faltan:
    print('Faltan partes:', len(faltan), ' '.join(faltan))
    salida('no'); sys.exit(0)
reporte, error = [], False
for dest, f in man.items():
    buf = b''
    for n in nombres[dest]:
        d = open(os.path.join(B, 'parts', n), 'rb').read().replace(b'\r\n', b'\n')
        if not d.endswith(b'\n'):
            d += b'\n'
        reporte.append(n + ' ' + hashlib.sha256(d).hexdigest())
        buf += d
    if hashlib.sha256(buf).hexdigest() == f['sha256']:
        os.makedirs(os.path.join(R, os.path.dirname(dest)), exist_ok=True)
        open(os.path.join(R, dest), 'wb').write(buf)
        print('OK', dest, len(buf))
    else:
        error = True
        print('Diferencia en', dest)
open(os.path.join(B, 'reporte.txt'), 'w').write('\n'.join(reporte) + '\n')
salida('error' if error else 'si')
