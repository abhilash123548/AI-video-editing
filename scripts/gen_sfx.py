import numpy as np
import wave
import os

SR = 44100
OUT_DIR = "public/audio/sfx"
os.makedirs(OUT_DIR, exist_ok=True)


def write_wav(name, samples):
    samples = np.clip(samples, -1.0, 1.0)
    pcm = (samples * 32767).astype(np.int16)
    path = os.path.join(OUT_DIR, name)
    with wave.open(path, "w") as f:
        f.setnchannels(1)
        f.setsampwidth(2)
        f.setframerate(SR)
        f.writeframes(pcm.tobytes())
    print("wrote", path, f"{len(samples)/SR:.3f}s")


def envelope_exp(n, decay):
    t = np.arange(n) / SR
    return np.exp(-decay * t)


def whoosh(duration=0.4):
    n = int(SR * duration)
    t = np.arange(n) / SR
    noise = np.random.uniform(-1, 1, n)
    # bandpass sweep: filter center frequency rises then falls (simulated via simple resonant-ish shaping)
    freq_sweep = np.linspace(400, 3500, n)
    # amplitude-modulate noise by a sine at the sweep frequency to create a "whoosh" tonal color
    tone_color = np.sin(2 * np.pi * np.cumsum(freq_sweep) / SR)
    sig = noise * 0.6 + tone_color * noise * 0.4
    env = np.sin(np.pi * np.arange(n) / n) ** 1.5  # rise then fall
    sig = sig * env
    return sig * 0.7


def impact(duration=0.28):
    n = int(SR * duration)
    t = np.arange(n) / SR
    thump_freq = np.linspace(120, 45, n)
    thump = np.sin(2 * np.pi * np.cumsum(thump_freq) / SR)
    thump *= envelope_exp(n, 14)
    click = np.random.uniform(-1, 1, int(SR * 0.012))
    click_env = envelope_exp(len(click), 60)
    click = np.pad(click * click_env, (0, n - len(click)))
    sig = thump * 0.85 + click * 0.5
    return sig


def positive_ding(duration=0.5):
    n = int(SR * duration)
    t = np.arange(n) / SR
    notes = [880.0, 1318.5]  # A5 -> E6, bright perfect-fifth rise
    sig = np.zeros(n)
    seg = n // 2
    for i, f in enumerate(notes):
        start = i * seg
        seg_n = n - start
        tt = np.arange(seg_n) / SR
        tone = (
            np.sin(2 * np.pi * f * tt)
            + 0.5 * np.sin(2 * np.pi * f * 2 * tt)
            + 0.25 * np.sin(2 * np.pi * f * 3 * tt)
        )
        tone *= envelope_exp(seg_n, 9)
        sig[start:start + seg_n] += tone * (0.6 if i == 0 else 0.8)
    sig = sig / np.max(np.abs(sig))
    return sig * 0.55


def negative_buzz(duration=0.32):
    n = int(SR * duration)
    t = np.arange(n) / SR
    f1, f2 = 145.0, 154.0  # close interval -> dissonant beating buzz
    saw1 = 2 * (t * f1 - np.floor(0.5 + t * f1))
    saw2 = 2 * (t * f2 - np.floor(0.5 + t * f2))
    sig = (saw1 + saw2) * 0.5
    sig *= envelope_exp(n, 10)
    return sig * 0.6


def pop(duration=0.14):
    n = int(SR * duration)
    t = np.arange(n) / SR
    freq = np.linspace(1400, 500, n)
    tone = np.sin(2 * np.pi * np.cumsum(freq) / SR)
    tone *= envelope_exp(n, 40)
    return tone * 0.5


def riser(duration=0.7):
    n = int(SR * duration)
    t = np.arange(n) / SR
    noise = np.random.uniform(-1, 1, n)
    freq_sweep = np.linspace(200, 4000, n)
    tone_color = np.sin(2 * np.pi * np.cumsum(freq_sweep) / SR)
    sig = noise * 0.35 + tone_color * 0.5
    env = (np.arange(n) / n) ** 1.3
    sig = sig * env
    return sig * 0.6


write_wav("whoosh.wav", whoosh())
write_wav("impact.wav", impact())
write_wav("positive_ding.wav", positive_ding())
write_wav("negative_buzz.wav", negative_buzz())
write_wav("pop.wav", pop())
write_wav("riser.wav", riser())
