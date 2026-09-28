import json, os, subprocess, sys
from faster_whisper import WhisperModel
slugs = {"theo":"https://cdn-hiring.8x.social/theo_testimonial_720.mp4"}
for s in ["jaka","zoja","nil-maden","ananda","hussain-8x","join-saloni","lu-min","maham","sami","vania"]:
    slugs[s] = f"https://cdn-hiring.8x.social/testimonials/{s}_testimonial_720.mp4"
model = WhisperModel("small", device="cpu", compute_type="int8")
out = {}
for s, url in slugs.items():
    path = f"videos/{s}.mp4"
    if not os.path.exists(path):
        subprocess.run(["curl", "-s", "-o", path, url], check=True)
    segs, info = model.transcribe(path, vad_filter=True)
    text = " ".join(x.text.strip() for x in segs)
    out[s] = {"duration": round(info.duration, 1), "lang": info.language, "text": text}
    open(f"transcripts/{s}.txt", "w").write(text)
    print(s, round(info.duration, 1), text[:120], flush=True)
json.dump(out, open("transcripts/all.json", "w"), indent=2, ensure_ascii=False)
print("DONE")
