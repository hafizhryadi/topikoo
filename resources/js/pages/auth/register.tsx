import React from 'react';

type Props = {
    message?: string;
};

const NotFound: React.FC<Props> = ({ message }) => {
    return (
        <main
            role="main"
            aria-labelledby="notfound-title"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                background: 'linear-gradient(180deg,#071024 0%, #02040a 100%)',
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                color: '#e6eef8',
            }}
        >
            <div
                style={{
                    textAlign: 'center',
                    maxWidth: 720,
                }}
            >
                <div
                    aria-hidden
                    style={{
                        fontSize: 96,
                        fontWeight: 700,
                        lineHeight: 1,
                        color: '#60a5fa',
                        marginBottom: 8,
                    }}
                >
                    404
                </div>

                <h1
                    id="notfound-title"
                    style={{
                        fontSize: 28,
                        margin: '8px 0 12px',
                        fontWeight: 600,
                        color: '#ffffff',
                    }}
                >
                    Page not found
                </h1>

                <p style={{ fontSize: 16, color: '#b8c7da', marginBottom: 20 }}>
                    {message ??
                        "Sorry, we couldn't find the page you're looking for."}
                </p>

                <div
                    style={{
                        display: 'flex',
                        gap: 12,
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    <a
                        href="/"
                        style={{
                            display: 'inline-block',
                            padding: '10px 16px',
                            background: '#0ea5e9',
                            color: 'white',
                            borderRadius: 8,
                            textDecoration: 'none',
                            fontWeight: 600,
                            boxShadow: '0 4px 10px rgba(14,165,233,0.12)',
                        }}
                    >
                        Go to homepage
                    </a>

                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        style={{
                            display: 'inline-block',
                            padding: '10px 16px',
                            background: 'transparent',
                            color: '#e6eef8',
                            border: '1px solid rgba(230,238,248,0.12)',
                            borderRadius: 8,
                            cursor: 'pointer',
                            fontWeight: 600,
                        }}
                    >
                        Go back
                    </button>
                </div>
            </div>
        </main>
    );
};

export default NotFound;
