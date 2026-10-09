# Vikikaynak API yardımcısı ve Türkçe sıralama anahtarı.
import json, sys, subprocess, urllib.parse, time
API = "https://tr.wikisource.org/w/api.php"
UA = "saran-tracker-poem-collector/0.1 (dikimenemre@gmail.com)"
def api(**p):
    p.setdefault("format", "json"); p.setdefault("formatversion", "2")
    url = API + "?" + urllib.parse.urlencode(p)
    for i in range(4):
        out = subprocess.run(["curl", "-s", "-A", UA, url], capture_output=True, text=True).stdout
        try: return json.loads(out)
        except Exception: time.sleep(2 + i * 3)
    raise RuntimeError(out[:300])
ALPHA = "abcçdefgğhıijklmnoöprsştuüvyz"
def trkey(s):
    s = s.replace("İ", "i").replace("I", "ı").lower()
    for a, b in zip("âîûê", "aiue"): s = s.replace(a, b)
    return [ALPHA.index(ch) if ch in ALPHA else 100 + ord(ch) for ch in s if ch.isalnum()]

if __name__ == "__main__":
    print(json.dumps(api(**dict(a.split("=",1) for a in sys.argv[1:])), ensure_ascii=False, indent=1)[:6000])
