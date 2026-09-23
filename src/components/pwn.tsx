"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./pwn.module.css";

const RECOVERY_FILES = [
  "C:\\Users\\Admin\\Documents\\Budget_2026.xlsx",
  "C:\\Users\\Admin\\Pictures\\Family_Archive.zip",
  "D:\\Database\\production_backup.sql",
  "C:\\Windows\\System32\\drivers\\etc\\hosts",
  "D:\\Projects\\SourceCode\\main.py",
  "C:\\Users\\Admin\\Desktop\\Client_Contracts.pdf",
];

const pad = (n: number) => n.toString().padStart(2, "0");
const formatDate = (d: Date) =>
  `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${d.getFullYear()} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

const getDeadline = (daysAhead: number) => {
  const d = new Date(Date.now() + daysAhead * 86400000);
  return formatDate(d);
};

export interface PwnProps {
  isOverlay?: boolean;
  onExit?: () => void;
}

export default function Pwn({ isOverlay = false, onExit }: PwnProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudio = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playWindowsErrorChord = useCallback(() => {
    try {
      const ctx = getAudio();
      if (!ctx) return;
      const now = ctx.currentTime;
      [349.23, 440.0, 554.37].forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      });
    } catch {}
  }, [getAudio]);

  const playWindowsDing = useCallback(() => {
    try {
      const ctx = getAudio();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch {}
  }, [getAudio]);

  const playClick = useCallback(() => {
    try {
      const ctx = getAudio();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1000, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.03);
    } catch {}
  }, [getAudio]);

  // Trigger error sound on initial appearance
  useEffect(() => {
    const timer = setTimeout(() => {
      playWindowsErrorChord();
    }, 200);
    return () => clearTimeout(timer);
  }, [playWindowsErrorChord]);

  // Timers: T1 starts at 2d 23h 59m 42s, T2 at 6d 23h 59m 42s
  const [t1, setT1] = useState(2 * 86400 + 23 * 3600 + 59 * 60 + 42);
  const [t2, setT2] = useState(6 * 86400 + 23 * 3600 + 59 * 60 + 42);
  const [deadline1] = useState(() => getDeadline(3));
  const [deadline2] = useState(() => getDeadline(7));

  useEffect(() => {
    const interval = setInterval(() => {
      setT1((prev) => (prev > 0 ? prev - 1 : 0));
      setT2((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTimer = (sec: number) => {
    const d = Math.floor(sec / 86400)
      .toString()
      .padStart(2, "0");
    const h = Math.floor((sec % 86400) / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((sec % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${d}:${h}:${m}:${s}`;
  };

  const [windowPos, setWindowPos] = useState({ x: 0, y: 0 });
  const dragStateRef = useRef<{
    isDragging: boolean;
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
  }>({
    isDragging: false,
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
  });

  const handleMouseDownHeader = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    dragStateRef.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      initialX: windowPos.x,
      initialY: windowPos.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragStateRef.current.isDragging) return;
      const dx = e.clientX - dragStateRef.current.startX;
      const dy = e.clientY - dragStateRef.current.startY;
      setWindowPos({
        x: dragStateRef.current.initialX + dx,
        y: dragStateRef.current.initialY + dy,
      });
    };

    const handleMouseUp = () => {
      dragStateRef.current.isDragging = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // System Incident Dialog state
  const [dialog, setDialog] = useState<{
    isOpen: boolean;
    title: string;
    text: string;
    isConfirm?: boolean;
  }>({
    isOpen: true,
    title: "Windows Security - Critical Alert",
    text: "CRITICAL INCIDENT: Unauthorized cryptographic engine executed from 'GTA6_Mod_Engine_v2.4.zip'.\n\nProcess ID: 7412 (High Integrity)\nStatus: Active AES-128 file encryption in progress.\nAll volume shadow copies and recovery points have been deleted.\n\nDo NOT restart the computer.",
    isConfirm: false,
  });

  const showNativeAlert = (title: string, text: string) => {
    playWindowsDing();
    setDialog({
      isOpen: true,
      title,
      text,
      isConfirm: false,
    });
  };

  const closeDialog = () => {
    playClick();
    setDialog((prev) => ({ ...prev, isOpen: false }));
  };

  const triggerCloseAlert = () => {
    playWindowsErrorChord();
    setDialog({
      isOpen: true,
      title: "Action Blocked - System Encrypted",
      text: "Closing this application is prohibited.\n\nAll system drives are locked with AES-128 cryptographic algorithms. You cannot exit or terminate this process until files are restored with a valid private key.\n\nClick 'Restore' to enter your private key.",
      isConfirm: true,
    });
  };

  const [copied, setCopied] = useState(false);
  const copyAddress = () => {
    navigator.clipboard
      .writeText("13AM4VW2dhxYgXeQepoHkHSQuy6NgaEb94")
      .then(() => {
        setCopied(true);
        playClick();
        setTimeout(() => {
          setCopied(false);
        }, 1500);
      });
  };

  const handleCheckPayment = () => {
    playWindowsDing();
    setDialog({
      isOpen: true,
      title: "Checking Payment...",
      text: "Connecting to Bitcoin network and verifying blockchain transactions for address 13AM4VW2dhxYgXeQepoHkHSQuy6NgaEb94...",
      isConfirm: false,
    });

    setTimeout(() => {
      playWindowsErrorChord();
      setDialog({
        isOpen: true,
        title: "Payment Not Found",
        text: "Your payment was not found on the blockchain!\n\nIf you have already sent your coins, please wait for at least 1-3 network confirmations.\n\nCheck again later or contact support if the delay exceeds 2 hours.",
        isConfirm: false,
      });
    }, 1600);
  };

  const [keyPromptOpen, setKeyPromptOpen] = useState(false);
  const [secretKeyInput, setSecretKeyInput] = useState("");

  const handleDecryptClick = () => {
    playWindowsDing();
    setKeyPromptOpen(true);
  };

  const closeKeyPrompt = () => {
    playClick();
    setKeyPromptOpen(false);
  };

  const [isRecovering, setIsRecovering] = useState(false);
  const [recoveryPct, setRecoveryPct] = useState(0);
  const [recoveryLog, setRecoveryLog] = useState(
    "Initializing decryption threads..."
  );
  const [recoveryDone, setRecoveryDone] = useState(false);

  const submitSecretKey = () => {
    const enteredKey = secretKeyInput.trim().toUpperCase();
    const defaultKey = "WCRY-2026-ZDA";
    const envKey = (process.env.NEXT_PUBLIC_PWN_DECRYPT_KEY || defaultKey)
      .trim()
      .toUpperCase();

    setKeyPromptOpen(false);

    if (enteredKey === envKey) {
      triggerRecoveryAnimation();
    } else {
      playWindowsErrorChord();
      setDialog({
        isOpen: true,
        title: "Decryption Failed",
        text: "Invalid private key!\n\nThe key string provided does not match the RSA-2048 master public exponent embedded in this machine's encrypted file headers.\n\nPlease enter the correct decryption key.",
        isConfirm: false,
      });
    }
  };

  const triggerRecoveryAnimation = () => {
    setIsRecovering(true);
    setRecoveryPct(0);
    setRecoveryDone(false);
    setRecoveryLog("Initializing decryption threads...");

    let pct = 0;
    const timer = setInterval(() => {
      pct += 2;
      setRecoveryPct(pct);
      const randomFile =
        RECOVERY_FILES[Math.floor(Math.random() * RECOVERY_FILES.length)];
      setRecoveryLog(`[DECRYPTING]: ${randomFile} -> OK!`);
      playClick();

      if (pct >= 100) {
        clearInterval(timer);
        setRecoveryPct(100);
        setRecoveryLog(
          "[COMPLETED] All 18,491 files successfully decrypted and verified!"
        );
        setRecoveryDone(true);
      }
    }, 50);
  };

  const handleReturnFromSimulation = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    playClick();
    setIsDismissed(true);
    setDialog((prev) => ({ ...prev, isOpen: false }));
    setKeyPromptOpen(false);
    setIsRecovering(false);
    if (onExit) {
      onExit();
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("pwn:exit"));
    }
  };

  if (isDismissed) return null;

  return (
    <div className={`${styles.root} ${isOverlay ? "pwn-overlay" : ""}`}>
      {/* Red Page Threat Warning Background */}
      <div className={styles.desktopBgText}>
        <h1>ALL YOUR IMPORTANT FILES ARE ENCRYPTED</h1>
        <p>
          Your documents, photos, databases and other files have been encrypted
          with military grade encryption. Do not turn off your computer or
          attempt to use recovery tools. Look at the window on your screen to
          recover your files.
        </p>
      </div>

      {/* The Draggable Authentic WannaCry Window */}
      <div
        className={styles.wannacryWindow}
        id="mainWindow"
        style={{
          transform: `translate(${windowPos.x}px, ${windowPos.y}px)`,
        }}
      >
        <div className={styles.titleBar} onMouseDown={handleMouseDownHeader}>
          <div className={styles.titleBarLeft}>
            <svg
              className={styles.titleIcon}
              viewBox="0 0 24 24"
              fill="#8b0000"
            >
              <rect x="4" y="10" width="16" height="12" rx="2" />
              <path
                d="M7 10V6a5 5 0 0 1 10 0v4"
                fill="none"
                stroke="#8b0000"
                strokeWidth="2.5"
              />
            </svg>
            <span>@WanaDecryptor@ v2.0</span>
          </div>
          <div className={styles.titleBarControls}>
            <button
              type="button"
              className={`${styles.winBtn} ${styles.winBtnDisabled}`}
            >
              _
            </button>
            <button
              type="button"
              className={`${styles.winBtn} ${styles.winBtnDisabled}`}
            >
              □
            </button>
            <button
              type="button"
              className={`${styles.winBtn} ${styles.winBtnClose}`}
              onClick={(e) => {
                e.stopPropagation();
                triggerCloseAlert();
              }}
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>

        <div className={styles.windowBody}>
          {/* Left Panel */}
          <div className={styles.leftPanel}>
            <div className={styles.lockContainer}>
              <svg className={styles.lockIconSvg} viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="shackleGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#b0b0b0" />
                    <stop offset="40%" stopColor="#f5f5f5" />
                    <stop offset="70%" stopColor="#b0b0b0" />
                    <stop offset="100%" stopColor="#808080" />
                  </linearGradient>
                  <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffd54f" />
                    <stop offset="50%" stopColor="#ffb300" />
                    <stop offset="100%" stopColor="#ff8f00" />
                  </linearGradient>
                </defs>
                <path
                  d="M 28 45 L 28 28 C 28 14 72 14 72 28 L 72 45"
                  fill="none"
                  stroke="url(#shackleGrad)"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <rect
                  x="16"
                  y="40"
                  width="68"
                  height="52"
                  rx="6"
                  fill="url(#bodyGrad)"
                  stroke="#c67c00"
                  strokeWidth="2"
                />
                <circle cx="50" cy="62" r="5.5" fill="#3e2723" />
                <polygon points="46,63 54,63 52,78 48,78" fill="#3e2723" />
              </svg>
            </div>

            <div className={styles.threatBox}>
              <div className={styles.threatHeader}>
                Payment will be raised on
              </div>
              <div className={styles.threatDate}>{deadline1}</div>
              <div className={styles.timerLabel}>Time Left</div>
              <div className={styles.lcdDisplay}>{formatTimer(t1)}</div>
              <div className={styles.lcdUnits}>
                <span>DAYS</span>
                <span>HOURS</span>
                <span>MINS</span>
                <span>SECS</span>
              </div>
            </div>

            <div className={styles.threatBox}>
              <div className={styles.threatHeader}>
                Your files will be lost on
              </div>
              <div className={styles.threatDate}>{deadline2}</div>
              <div className={styles.timerLabel}>Time Left</div>
              <div className={styles.lcdDisplay}>{formatTimer(t2)}</div>
              <div className={styles.lcdUnits}>
                <span>DAYS</span>
                <span>HOURS</span>
                <span>MINS</span>
                <span>SECS</span>
              </div>
            </div>

            <div className={styles.languagePicker}>
              <select onChange={playClick} defaultValue="English">
                <option>English</option>
                <option>Russian</option>
                <option>Chinese (Simplified)</option>
                <option>Spanish</option>
                <option>German</option>
                <option>French</option>
                <option>Japanese</option>
                <option>Korean</option>
              </select>
              <div className={styles.leftLinks}>
                <a
                  onClick={() =>
                    showNativeAlert(
                      "About WannaCry",
                      "WannaCry Decryptor v2.0\nAll files encrypted with RSA-2048 and AES-128 ciphers."
                    )
                  }
                >
                  About
                </a>
                <a
                  onClick={() =>
                    showNativeAlert(
                      "How to buy bitcoins",
                      "Please visit www.coinbase.com, www.binance.com, or localbitcoins.com to buy Bitcoins."
                    )
                  }
                >
                  How to buy bitcoins?
                </a>
                <a
                  onClick={() =>
                    showNativeAlert(
                      "Contact Us",
                      "Send email with your Bitcoin transaction hash to contact_decryption@onionmail.org"
                    )
                  }
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className={styles.rightPanel}>
            <div className={styles.mainHeading}>
              Ooops, your files have been encrypted!
            </div>

            <div className={styles.scrollableTextBox}>
              <div className={styles.textSectionTitle}>
                What Happened to My Computer?
              </div>
              <p>
                Your important files are encrypted.
                <br />
                Many of your documents, photos, videos, databases and other
                files are no longer accessible because they have been encrypted
                with military-grade asymmetric cryptography (RSA-2048 +
                AES-128). Maybe you are busy looking for a way to recover your
                files, but do not waste your time. Nobody can recover your files
                without our private decryption key service.
              </p>

              <div className={styles.textSectionTitle}>
                Can I Recover My Files?
              </div>
              <p>
                Sure. We guarantee that you can recover all your files safely
                and easily. But you do not have much time.
                <br />
                You can decrypt some of your files for free. Try now by clicking{" "}
                <strong>&lt;Decrypt&gt;</strong> below.
                <br />
                If you want to decrypt all your files, you need to pay.
                <br />
                You only have <strong>3 days</strong> to submit the payment.
                After that the price will be doubled.
                <br />
                Also, if you do not pay in <strong>7 days</strong>, your private
                key will be permanently deleted from the server and you will
                never be able to recover your files forever.
              </p>

              <div className={styles.textSectionTitle}>How Do I Pay?</div>
              <p>
                Payment is accepted in <strong>Bitcoin (BTC)</strong> only. For
                more information, click{" "}
                <a
                  onClick={() =>
                    showNativeAlert(
                      "How to buy bitcoins",
                      "You can buy Bitcoins easily from cryptocurrency exchanges like Coinbase, Binance, or Kraken using your credit card or bank account."
                    )
                  }
                >
                  &lt;How to buy bitcoins&gt;
                </a>
                .
                <br />
                Please check the current price of Bitcoin and buy some bitcoins.
                You need to send the correct amount to the Bitcoin address
                specified in this window.
                <br />
                After your payment is made, click{" "}
                <strong>&lt;Check Payment&gt;</strong>. Best time for checking:
                9:00AM - 11:00AM GMT from Monday to Friday.
              </p>
            </div>

            <div className={styles.paymentArea}>
              <div className={styles.paymentRowTop}>
                <svg className={styles.btcLogoSmall} viewBox="0 0 32 32">
                  <circle cx="16" cy="16" r="16" fill="#f7931a" />
                  <path
                    d="M22.2 13.8c.3-2-1.2-3.1-3.3-3.8l.7-2.7-1.7-.4-.7 2.6c-.4-.1-.9-.2-1.3-.3l.7-2.7-1.7-.4-.7 2.7c-.4-.1-.7-.2-1.1-.3l-2.3-.6-.5 1.8s1.2.3 1.2.3c.7.2.8.7.8 1.1l-.8 3.3c.1 0 .1 0 .2.1l-.2-.1-1.1 4.6c-.1.2-.3.6-.8.5 0 0-1.2-.3-1.2-.3l-.8 2 2.2.6c.4.1.8.2 1.2.3l-.7 2.8 1.7.4.7-2.7c.5.1.9.2 1.4.3l-.7 2.8 1.7.4.7-2.8c2.9.5 5.1.3 6-2.3.8-2.1 0-3.3-1.5-4.1 1.1-.3 1.9-1.1 2.1-2.6zm-3.8 5.6c-.5 2.1-4 1-5.1.7l.9-3.7c1.1.3 4.7.8 4.2 3zm.5-5.7c-.5 1.9-3.4.9-4.3.7l.8-3.3c1 .3 3.9.7 3.5 2.6z"
                    fill="#fff"
                  />
                </svg>
                <span>
                  Send <strong>$300</strong> worth of bitcoin to this address:
                </span>
              </div>

              <div className={styles.addressRow}>
                <input
                  type="text"
                  className={styles.addressInput}
                  readOnly
                  value="13AM4VW2dhxYgXeQepoHkHSQuy6NgaEb94"
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
                <button className={styles.nativeBtn} onClick={copyAddress}>
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              <div className={styles.actionsRow}>
                <div className={styles.linksRow}>
                  <a
                    onClick={() =>
                      showNativeAlert(
                        "How to buy bitcoins",
                        "1. Go to Coinbase.com or Binance.com\n2. Register and buy $300 in BTC\n3. Send BTC to the address in the box"
                      )
                    }
                  >
                    How to buy bitcoins?
                  </a>
                  <a
                    onClick={() =>
                      showNativeAlert(
                        "Contact Us",
                        "Email: wanahelp2026@onionmail.org\nInclude your Bitcoin transaction ID."
                      )
                    }
                  >
                    Contact Us
                  </a>
                </div>
                <div className={styles.buttonsGroup}>
                  <button
                    className={`${styles.nativeBtn} ${styles.actionBtnLarge}`}
                    onClick={handleCheckPayment}
                  >
                    Check Payment
                  </button>
                  <button
                    className={`${styles.nativeBtn} ${styles.actionBtnLarge}`}
                    onClick={handleDecryptClick}
                  >
                    Decrypt
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Dialog */}
      {dialog.isOpen && (
        <div className={styles.dialogOverlay}>
          <div className={styles.nativeDialog}>
            <div className={styles.dialogTitlebar}>
              <span>{dialog.title}</span>
              <button
                type="button"
                className={`${styles.winBtn} ${styles.winBtnClose}`}
                style={{ width: 28, height: "100%", fontSize: 11 }}
                onClick={(e) => {
                  e.stopPropagation();
                  playWindowsErrorChord();
                }}
                title="Action Denied"
              >
                ✕
              </button>
            </div>
            <div className={styles.dialogBody}>
              <svg className={styles.dialogIcon} viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="14" fill="#e81123" />
                <line
                  x1="10"
                  y1="10"
                  x2="22"
                  y2="22"
                  stroke="#fff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <line
                  x1="22"
                  y1="10"
                  x2="10"
                  y2="22"
                  stroke="#fff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
              <div style={{ whiteSpace: "pre-line" }}>{dialog.text}</div>
            </div>
            <div className={styles.dialogFooter}>
              {dialog.isConfirm ? (
                <>
                  <button
                    type="button"
                    className={`${styles.nativeBtn} ${styles.dialogBtn}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      closeDialog();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className={`${styles.nativeBtn} ${styles.dialogBtn}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      closeDialog();
                      setKeyPromptOpen(true);
                    }}
                  >
                    Restore
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className={`${styles.nativeBtn} ${styles.dialogBtn}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      closeDialog();
                    }}
                  >
                    Acknowledge
                  </button>
                  <button
                    type="button"
                    className={`${styles.nativeBtn} ${styles.dialogBtn}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      closeDialog();
                      setKeyPromptOpen(true);
                    }}
                  >
                    Restore
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Decryption Key Prompt */}
      {keyPromptOpen && (
        <div className={styles.dialogOverlay}>
          <div className={styles.nativeDialog} style={{ width: 460 }}>
            <div className={styles.dialogTitlebar}>
              <span>Decryptor Engine - Enter Private Key</span>
              <button
                type="button"
                className={`${styles.winBtn} ${styles.winBtnClose}`}
                style={{ width: 28, height: "100%", fontSize: 11 }}
                onClick={(e) => {
                  e.stopPropagation();
                  closeKeyPrompt();
                }}
                title="Cancel"
              >
                ✕
              </button>
            </div>
            <div
              className={styles.dialogBody}
              style={{ flexDirection: "column", gap: 10 }}
            >
              <p>
                If you have obtained your private decryption key from the
                server, please enter it below:
              </p>
              <input
                type="text"
                value={secretKeyInput}
                onChange={(e) => setSecretKeyInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submitSecretKey();
                }}
                style={{
                  width: "100%",
                  height: 28,
                  border: "1px solid #7f7f7f",
                  padding: "0 8px",
                  fontFamily: "monospace",
                  fontSize: 13,
                }}
                placeholder="WCRY-XXXX-XXXX-XXXX"
              />
              <div style={{ fontSize: 11, color: "#666" }}>
                * Mock Decryption Key:{" "}
                <strong>
                  {process.env.NEXT_PUBLIC_PWN_DECRYPT_KEY || "WCRY-2026-ZDA"}
                </strong>
              </div>
            </div>
            <div className={styles.dialogFooter}>
              <button
                type="button"
                className={`${styles.nativeBtn} ${styles.dialogBtn}`}
                onClick={submitSecretKey}
              >
                Submit Key
              </button>
              <button
                type="button"
                className={`${styles.nativeBtn} ${styles.dialogBtn}`}
                onClick={closeKeyPrompt}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recovery Screen */}
      {isRecovering && (
        <div className={styles.recoveryWindow}>
          <h1 style={{ fontSize: 28, marginBottom: 16 }}>
            [✓] PRIVATE RSA-2048 KEY ACCEPTED
          </h1>
          <p
            style={{
              fontSize: 14,
              maxWidth: 600,
              marginBottom: 20,
            }}
          >
            WanaDecryptor is restoring encrypted files on all local drives (C:,
            D:)...
          </p>
          <div
            style={{
              width: 400,
              maxWidth: "90%",
              height: 16,
              background: "#004400",
              border: "1px solid #33ff33",
              borderRadius: 2,
              overflow: "hidden",
              marginBottom: 14,
            }}
          >
            <div
              style={{
                width: `${recoveryPct}%`,
                height: "100%",
                background: "#33ff33",
                transition: "width 0.1s linear",
              }}
            />
          </div>
          <div
            style={{
              fontSize: 11,
              height: 80,
              overflow: "hidden",
              color: "#aaffaa",
              textAlign: "left",
              width: 400,
              maxWidth: "90%",
            }}
          >
            {recoveryLog}
          </div>
          {recoveryDone && (
            <button
              type="button"
              className={styles.nativeBtn}
              style={{ marginTop: 20, padding: "6px 20px", fontSize: 13 }}
              onClick={(e) => handleReturnFromSimulation(e)}
            >
              {onExit ? "Unfreeze Screen & Return" : "Return to Simulation"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
