import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Play,
  Check,
  Sparkles,
  Youtube,
  BookOpen,
  LayoutGrid,
  Users,
  BarChart3,
  Settings,
  ChevronRight,
  Code2,
  FileText,
  CircleHelp,
  Plus,
  Link2,
  Globe2,
  Palette,
  Calculator,
  Wallet,
  GraduationCap,
  CheckCircle2,
  X,
} from "lucide-react";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import educatorImage from "../assets/educator.jpg";
import Brand from "../components/common/Brand";
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const [dialog, setDialog] = useState<"course" | "login" | null>(null);
  const [url, setUrl] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    document.title = "Practivo for Educators — Turn Your Viewers into Learners";
  }, []);

  const open = (kind: "course" | "login") => {
    setDialog(kind);
    setGenerated(false);
  };

  const closeDialog = () => {
    setDialog(null);
  };

  return (
    <div className="landing-page-root">
      <header className="page-container site-header">
        <Link to="/" aria-label="Practivo home" style={{ textDecoration: "none" }}>
          <Brand to={null} />
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#features">Features</a>
          <a href="#earn">
            Earn with Practivo <ArrowUpRight size={12} style={{ display: "inline" }} />
          </a>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            type="button"
            className="landing-btn landing-btn-ghost header-login"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
          <button
            type="button"
            className="landing-btn landing-btn-default"
            onClick={() => navigate("/login")}
          >
            Get started <ArrowRight size={14} />
          </button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="page-container">
            <div className="eyebrow">
              <Youtube size={15} /> BUILT FOR YOUTUBE EDUCATORS <span className="text-muted-foreground">↗</span>
            </div>
            <h1>
              Turn your viewers<br />
              <span>into learners.</span>
            </h1>
            <p className="hero-description">
              The easiest way for YouTube educators to create, distribute,
              <br className="hidden sm:block" /> and monetize interactive exercises.
            </p>
            <div className="hero-actions">
              <button
                type="button"
                className="landing-btn landing-btn-default hero-button"
                onClick={() => open("course")}
              >
                Create your first course <ArrowRight size={14} />
              </button>
              <a
                href="#how-it-works"
                className="landing-btn landing-btn-outline hero-button"
                style={{ textDecoration: "none" }}
              >
                <Play size={14} /> See how it works
              </a>
            </div>
            <div className="hero-fine">
              <span>
                <Check size={12} /> Start with your existing videos
              </span>
              <span>
                <Check size={12} /> Your content. Your community.
              </span>
            </div>

            {/* Interactive Workspace Preview Shell */}
            <div className="preview-shell" aria-label="Example educator course workspace">
              <div className="preview-top">
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span className="brand-mark">
                    <BookOpen size={13} />
                  </span>
                  <span className="preview-brand">
                    practivo<span className="text-primary">.</span>
                  </span>
                  <span
                    style={{
                      marginLeft: "12px",
                      borderLeft: "1px solid var(--border)",
                      paddingLeft: "16px",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    Educator workspace
                  </span>
                </div>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      borderRadius: "9999px",
                      backgroundColor: "var(--accent)",
                      padding: "4px 8px",
                      color: "var(--primary)",
                      fontWeight: 600,
                      fontSize: "10px",
                    }}
                  >
                    AK
                  </span>
                  <span className="hidden sm:inline">Alex</span>
                </span>
              </div>
              <div className="preview-body">
                <aside className="preview-sidebar">
                  <div className="preview-sidebar-label">Workspace preview</div>
                  {[
                    [LayoutGrid, "Overview"],
                    [BookOpen, "My courses"],
                    [Users, "Learners"],
                    [BarChart3, "Analytics"],
                    [Wallet, "Earnings"],
                  ].map(([Icon, label]) => {
                    const ItemIcon = Icon as typeof BookOpen;
                    return (
                      <div
                        key={String(label)}
                        className={`preview-nav ${label === "My courses" ? "active" : ""}`}
                      >
                        <ItemIcon />
                        {String(label)}
                        {label === "My courses" && (
                          <span style={{ marginLeft: "auto" }}>3</span>
                        )}
                      </div>
                    );
                  })}
                  <div
                    className="preview-nav"
                    style={{ marginTop: "36px", color: "var(--muted-foreground)" }}
                  >
                    <Settings />
                    Settings
                  </div>
                </aside>

                <div className="preview-center">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "9px",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    <span>
                      My courses{" "}
                      <ChevronRight
                        size={9}
                        style={{ display: "inline", margin: "0 4px" }}
                      />{" "}
                      Course overview
                    </span>
                    <span
                      className="bg-success-soft text-success"
                      style={{ borderRadius: "4px", padding: "4px 8px" }}
                    >
                      Published
                    </span>
                  </div>
                  <h3>Python for Beginners</h3>
                  <p style={{ fontSize: "10px", color: "var(--muted-foreground)", margin: "0 0 12px 0" }}>
                    12 lessons · 4 chapters · A whole lot of possibilities
                  </p>
                  <div className="video-preview">
                    <img
                      src={educatorImage}
                      alt="Programming educator teaching a Python video lesson"
                      width={1088}
                      height={608}
                    />
                    <div className="video-shade" />
                    <a
                      href="#how-it-works"
                      className="video-play"
                      aria-label="See how it works"
                      style={{ textDecoration: "none" }}
                    >
                      <Play style={{ fill: "currentColor" }} size={16} />
                    </a>
                    <div className="video-caption">
                      01 · Getting started with Python
                      <span style={{ marginLeft: "12px", opacity: 0.7 }}>12:34</span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      marginTop: "12px",
                      fontSize: "9px",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Users size={12} /> 248 learners
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <BarChart3 size={12} /> 82% completion
                    </span>
                    <span className="text-primary" style={{ marginLeft: "auto" }}>
                      Example course
                    </span>
                  </div>
                </div>

                <aside className="preview-practice">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h4 style={{ fontSize: "12px", fontWeight: 600, margin: 0 }}>
                      Beyond the video
                    </h4>
                    <Sparkles size={13} className="text-primary" />
                  </div>
                  <p
                    style={{
                      marginTop: "4px",
                      marginBottom: "12px",
                      fontSize: "10px",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    A little practice. A deeper understanding.
                  </p>
                  {[
                    [CircleHelp, "Quick quiz", "5 questions · Check understanding"],
                    [Code2, "Coding challenge", "Put Python into practice"],
                    [FileText, "Lesson notes", "The takeaways, all in one place"],
                  ].map(([Icon, title, subtitle]) => {
                    const ItemIcon = Icon as typeof BookOpen;
                    return (
                      <div className="practice-item" key={String(title)}>
                        <span className="practice-icon">
                          <ItemIcon />
                        </span>
                        <div>
                          <div style={{ fontSize: "11px", fontWeight: 600 }}>
                            {String(title)}
                          </div>
                          <div
                            style={{
                              fontSize: "8px",
                              color: "var(--muted-foreground)",
                              marginTop: "4px",
                            }}
                          >
                            {String(subtitle)}
                          </div>
                        </div>
                        <ChevronRight
                          size={12}
                          style={{
                            marginLeft: "auto",
                            color: "var(--muted-foreground)",
                          }}
                        />
                      </div>
                    );
                  })}
                  <div className="ai-banner">
                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                        alignItems: "center",
                        fontWeight: 600,
                        marginBottom: "4px",
                      }}
                    >
                      <Sparkles size={12} className="text-primary" /> Your AI
                      teaching assistant
                    </div>
                    From video to meaningful practice,
                    <br />
                    in a fraction of the time.
                  </div>
                  <a
                    href="#how-it-works"
                    className="landing-btn landing-btn-ghost text-primary"
                    style={{
                      width: "100%",
                      marginTop: "8px",
                      fontSize: "10px",
                      height: "28px",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Plus size={11} /> Try a practice activity
                  </a>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* Trust band */}
        <section className="trust-band">
          <div className="page-container">
            <p style={{ fontSize: "11px", color: "var(--muted-foreground)", margin: "0 0 12px 0" }}>
              Whatever you teach, there’s a better way to learn it.
            </p>
            <div className="subjects">
              <span>
                <Code2 /> Coding
              </span>
              <span>
                <Palette /> Design
              </span>
              <span>
                <Calculator /> Mathematics
              </span>
              <span>
                <Globe2 /> Languages
              </span>
              <span>
                <GraduationCap /> And beyond
              </span>
            </div>
          </div>
        </section>

        {/* Manifesto band */}
        <section className="manifesto-band">
          <div className="page-container">
            <p className="manifesto">
              Stop being a <span className="manifesto-keep">video host—</span>
              <br />
              <em>start being a mentor.</em>
            </p>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="section page-container">
          <div style={{ textAlign: "center" }}>
            <div className="section-label">From watching to doing</div>
            <h2 className="section-heading">
              You’ve already made the content.
              <br />
              We help you take it further.
            </h2>
            <p className="section-description" style={{ marginInline: "auto" }}>
              No starting from scratch. No complicated setup.
              <br />
              Just a more meaningful way for your audience to learn.
            </p>
          </div>
          <div className="steps-grid">
            {[
              {
                title: "Bring your YouTube content",
                text: "Paste a video or playlist link. Organize the content you already love into a clear learning journey.",
              },
              {
                title: "Add the “aha” moments",
                text: "Create quizzes, assignments, and hands-on practice with AI. Review, refine, and make them your own.",
              },
              {
                title: "Share. Teach. See the impact.",
                text: "Add your course link to your video description. Watch viewers become learners, and progress become visible.",
              },
            ].map((step, i) => (
              <div key={step.title}>
                <div className="step-number">0{i + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="section feature-band">
          <div className="page-container feature-grid">
            <div>
              <div className="section-label">Your expertise. A little AI magic.</div>
              <h2 className="section-heading">
                Less busywork.
                <br />
                More breakthrough.
              </h2>
              <p className="section-description">
                You bring the knowledge. Your AI teaching assistant helps shape
                it into a course your learners can actually practice.
              </p>
              <div className="feature-points">
                <span>
                  <CheckCircle2 /> Turn a playlist into a structured course
                </span>
                <span>
                  <CheckCircle2 /> Create quizzes, assignments, and hands-on practice
                </span>
                <span>
                  <CheckCircle2 /> Stay in control. Review everything before publishing.
                </span>
              </div>
              <button
                type="button"
                className="landing-btn landing-btn-link"
                style={{ paddingInline: 0, marginTop: "24px" }}
                onClick={() => open("course")}
              >
                Explore the course preview <ArrowRight size={14} />
              </button>
            </div>
            <div className="ai-preview">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                <span className="practice-icon">
                  <Sparkles size={15} />
                </span>{" "}
                Meet your AI course assistant{" "}
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: "9px",
                    color: "var(--muted-foreground)",
                  }}
                >
                  PREVIEW
                </span>
              </div>
              <div className="chat-message">
                “Turn my Python playlist into a beginner-friendly course. Add a
                quiz after each chapter and a hands-on final project.”
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "12px",
                  fontWeight: 500,
                  marginBottom: "8px",
                }}
              >
                <Sparkles size={14} className="text-primary" /> A learning journey,
                ready for your review.
              </div>
              {[
                "01  Python foundations",
                "02  Variables & data types",
                "03  Loops & conditionals",
              ].map((chapter) => (
                <div className="course-row" key={chapter}>
                  <CheckCircle2 />
                  <span>{chapter}</span>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: "9px",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    3 lessons + quiz
                  </span>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <span
                  style={{ fontSize: "10px", color: "var(--muted-foreground)" }}
                >
                  Your knowledge, thoughtfully structured.
                </span>
                <button
                  type="button"
                  className="landing-btn landing-btn-default landing-btn-sm"
                  onClick={() => open("course")}
                >
                  Try the preview <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Earn with Practivo */}
        <section id="earn" className="section page-container">
          <div className="section-label">More than a view count</div>
          <h2 className="section-heading">
            A better experience for them.
            <br />
            A bigger opportunity for you.
          </h2>
          <div className="feature-cards">
            <article className="feature-card">
              <BookOpen />
              <h3>Make learning stick</h3>
              <p>
                Quizzes, notes, assignments, and hands-on practice turn passive
                watching into active understanding.
              </p>
            </article>
            <article className="feature-card">
              <BarChart3 />
              <h3>See real learning happen</h3>
              <p>
                Understand progress, practice performance, and the topics your
                learners struggle with—not just watch time.
              </p>
            </article>
            <article className="feature-card">
              <Wallet />
              <h3>Earn from your expertise</h3>
              <p>
                Keep it free or offer premium courses and practice. You choose
                what’s paid, with commission-based educator payouts.
              </p>
            </article>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-band">
          <div className="page-container cta-content">
            <div>
              <h2>
                Your next great course
                <br />
                is already on your channel.
              </h2>
              <p>Give your audience a new way to learn. Start with one video.</p>
            </div>
            <button
              type="button"
              className="landing-btn landing-btn-default hero-button"
              onClick={() => open("course")}
            >
              Create your first course <ArrowRight size={14} />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="page-container footer">
        <Link to="/" aria-label="Practivo home" style={{ textDecoration: "none" }}>
          <Brand to={null} />
        </Link>
        <span>
          © {new Date().getFullYear()} Practivo. Built for the way you teach.
        </span>
        <a className="footer-contact" href="mailto:contact@practivo.net">
          contact@practivo.net
        </a>
      </footer>

      {/* Dialog Modals */}
      <Dialog
        open={dialog !== null}
        onClose={closeDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "10px",
            bgcolor: "var(--background)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
            p: { xs: 2.5, sm: 3 },
            position: "relative",
            fontFamily: "var(--font-sans)",
            boxShadow: "var(--shadow-preview)",
          },
        }}
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(4px)",
          },
        }}
      >
        <IconButton
          onClick={closeDialog}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            color: "var(--muted-foreground)",
            "&:hover": { color: "var(--foreground)" },
          }}
          aria-label="close"
        >
          <X size={18} />
        </IconButton>

        <DialogContent sx={{ p: 0, mt: 1 }}>
          {dialog === "course" && (
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "19px",
                  fontWeight: 600,
                  margin: "0 0 6px 0",
                  color: "var(--foreground)",
                }}
              >
                {generated
                  ? "Your course preview"
                  : "Start with your YouTube content"}
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--muted-foreground)",
                  marginTop: 0,
                  marginBottom: "20px",
                  lineHeight: 1.5,
                }}
              >
                {generated
                  ? "Example structure only. Nothing has been imported, saved, or published."
                  : "Explore a sample course structure. Live YouTube imports and AI generation are not connected yet."}
              </p>

              {!generated ? (
                <form
                  style={{ display: "grid", gap: "16px" }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    setGenerated(true);
                  }}
                >
                  <label
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--foreground)",
                    }}
                  >
                    Course name
                    <input
                      className="dialog-input"
                      style={{ marginTop: "8px" }}
                      placeholder="e.g. Python for Beginners"
                      required
                      value={courseTitle}
                      onChange={(e) => setCourseTitle(e.target.value)}
                    />
                  </label>
                  <label
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--foreground)",
                    }}
                  >
                    YouTube video or playlist link
                    <input
                      className="dialog-input"
                      style={{ marginTop: "8px" }}
                      type="url"
                      placeholder="https://www.youtube.com/playlist?list=..."
                      required
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </label>
                  <button
                    type="submit"
                    className="landing-btn landing-btn-default"
                    style={{ height: "42px", marginTop: "4px" }}
                  >
                    <Link2 size={15} /> Preview a course structure{" "}
                    <ArrowRight size={14} />
                  </button>
                </form>
              ) : (
                <div>
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "18px",
                      fontWeight: 600,
                      marginBottom: "12px",
                      marginTop: 0,
                    }}
                  >
                    {courseTitle}
                  </h4>
                  {[
                    "Introduction & foundations",
                    "Core concepts & guided practice",
                    "Apply your skills · Final assignment",
                  ].map((title, i) => (
                    <div key={title} className="course-row">
                      <span className="text-primary" style={{ fontWeight: 600 }}>
                        0{i + 1}
                      </span>
                      <span>{title}</span>
                      <Check size={15} style={{ marginLeft: "auto" }} />
                    </div>
                  ))}
                  <div
                    style={{
                      marginTop: "16px",
                      fontSize: "12px",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    Sample activities: a chapter quiz, lesson notes, and a final
                    assignment.
                  </div>
                  <button
                    type="button"
                    className="landing-btn landing-btn-outline"
                    style={{ marginTop: "20px" }}
                    onClick={() => setGenerated(false)}
                  >
                    Edit course details
                  </button>
                </div>
              )}
            </div>
          )}



          {dialog === "login" && (
            <div style={{ display: "grid", gap: "14px" }}>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "19px",
                    fontWeight: 600,
                    margin: "0 0 6px 0",
                    color: "var(--foreground)",
                  }}
                >
                  Your educator workspace
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--muted-foreground)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Welcome to Practivo. Choose how you would like to proceed into
                  the workspace.
                </p>
              </div>

              <div style={{ display: "grid", gap: "10px", marginTop: "8px" }}>
                <button
                  type="button"
                  className="landing-btn landing-btn-default"
                  style={{ height: "42px" }}
                  onClick={() => navigate("/login")}
                >
                  Sign in to Educator Portal <ArrowRight size={14} />
                </button>
                <button
                  type="button"
                  className="landing-btn landing-btn-outline"
                  style={{ height: "42px" }}
                  onClick={() => open("course")}
                >
                  Explore a course preview <ArrowRight size={14} />
                </button>
                <a
                  href="#how-it-works"
                  className="landing-btn landing-btn-ghost"
                  style={{
                    height: "42px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={closeDialog}
                >
                  <Play size={14} /> Try the learner experience
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
