import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import InputField from '../components/InputField';
import loginIllustration from '../assets/login-illustration.png';
import styles from '../styles/auth.module.css';
import cStyles from '../styles/components.module.css';

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        if (!email.trim()) {
            setError('Email wajib diisi.');
            return;
        }

        if (!email.includes('@') && !['admin', 'guru'].includes(email.toLowerCase())) {
            setError('Masukkan email yang valid, atau gunakan alias demo admin/guru.');
            return;
        }

        setError('');
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setIsSent(true);
        }, 700);
    };

    return (
        <AuthLayout
            brandPosition="below"
            illustrationSrc={loginIllustration}
            illustrationAlt="Ilustrasi perlengkapan sekolah RekaSedia"
            tagline="Pulihkan akses akun inventaris sekolah Anda dengan alur reset password yang sederhana."
        >
            <h1 className={`${styles.formHeading} animate-fade-in-up`}>
                Lupa Password?
            </h1>
            <p className={`${styles.formSubtitle} animate-fade-in-up delay-1`}>
                Masukkan email akun Anda. Untuk mode dummy, sistem akan menampilkan konfirmasi reset tanpa mengirim email sungguhan.
            </p>

            {isSent ? (
                <div className={`${styles.resetSuccessBox} animate-fade-in-up delay-2`}>
                    <div className={styles.resetSuccessIcon}>
                        <i className="fa-solid fa-envelope-circle-check"></i>
                    </div>
                    <h3>Instruksi Reset Siap</h3>
                    <p>
                        Jika akun <strong>{email}</strong> terdaftar, instruksi reset password akan dikirim. Pada mode dummy, gunakan login demo seperti biasa.
                    </p>
                    <Link to="/" className={`${cStyles.btn} ${cStyles.btnPrimary}`}>
                        Kembali ke Login
                    </Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit} noValidate>
                    <div className="animate-fade-in-up delay-2">
                        <InputField
                            id="resetEmail"
                            label="Email Akun"
                            placeholder="Contoh: admin@rekasedia.sch.id"
                            icon="fa-regular fa-envelope"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(val) => {
                                setEmail(val);
                                if (error) setError('');
                            }}
                            error={error}
                        />
                    </div>

                    <button
                        type="submit"
                        className={`${cStyles.btn} ${cStyles.btnPrimary} animate-fade-in-up delay-3`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <i className="fa-solid fa-spinner fa-spin"></i> Memproses...
                            </>
                        ) : (
                            <>
                                Kirim Instruksi <i className="fa-solid fa-paper-plane"></i>
                            </>
                        )}
                    </button>
                </form>
            )}

            <p className={`${styles.formFooter} animate-fade-in-up delay-4`}>
                Ingat password Anda? <Link to="/">Masuk kembali</Link>
            </p>
        </AuthLayout>
    );
};

export default ForgotPasswordPage;
