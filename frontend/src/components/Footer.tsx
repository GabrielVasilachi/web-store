import { useState, type FormEvent } from 'react'
import { ArrowUpRightIcon, HouseMark, PlusIcon } from './Icons'
import { Reveal } from './MotionEffects'

const questions = [
  { id: 'fit-guide', title: 'Cum îmi aleg mărimea?', answer: 'Piesele din Drop 001 au o croială relaxed, unisex, în mărimi de la XS la XL. Alege mărimea pe cardul produsului înainte să îl adaugi în coș. Pentru recomandări și măsurători, scrie-ne la hello@fithouse.store.' },
  { id: 'shipping', title: 'Cum funcționează livrarea?', answer: 'Transportul este gratuit pentru comenzile de peste 60 EUR. Pentru disponibilitatea livrării în zona ta și detalii despre comandă, contactează-ne la hello@fithouse.store.' },
  { id: 'returns', title: 'Dacă fit-ul nu este pentru mine?', answer: 'Ai la dispoziție 30 de zile pentru retur. Scrie-ne la hello@fithouse.store cu detaliile comenzii și te ajutăm cu pașii următori.' },
]

export function Footer() {
  const [emailPrepared, setEmailPrepared] = useState(false)

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const email = String(new FormData(event.currentTarget).get('email') ?? '')
    const subject = encodeURIComponent('FitHouse — înscriere în lista pentru drop-uri')
    const body = encodeURIComponent(`Bună! Vreau să primesc noutăți despre următoarele drop-uri FitHouse la adresa ${email}.`)
    window.location.href = `mailto:hello@fithouse.store?subject=${subject}&body=${body}`
    setEmailPrepared(true)
  }

  return (
    <>
      <section className="faq-section section-space" id="help" aria-labelledby="faq-title">
        <Reveal><span className="section-kicker">GOOD QUESTIONS. STRAIGHT ANSWERS.</span><h2 id="faq-title">Totul clar.<br /><span>Totul simplu.</span></h2><a className="text-link" href="mailto:hello@fithouse.store">Hai să vorbim <ArrowUpRightIcon /></a></Reveal>
        <div className="faq-list">{questions.map((question, index) => <details id={question.id} key={question.id}><summary><span className="mono">0{index + 1}</span><h3>{question.title}</h3><PlusIcon /></summary><p>{question.answer}</p></details>)}</div>
      </section>
      <section className="newsletter-section" id="club" aria-labelledby="club-title">
        <Reveal><span className="section-kicker"><i className="status-dot" /> THE FITHOUSE INNER CIRCLE</span><h2 id="club-title">YOU'RE ON<br /><span>THE GUEST LIST.</span></h2><p>Drop-uri noi, povești și inspirație.<br />Lasă-ne emailul. Păstrăm un loc pentru tine.</p></Reveal>
        <Reveal className="newsletter-form-wrap" delay={0.1}>
          <HouseMark className="newsletter-house" />
          <form onSubmit={handleNewsletterSubmit}>
            <label className="sr-only" htmlFor="newsletter-email">Adresa ta de email</label>
            <input id="newsletter-email" name="email" type="email" autoComplete="email" placeholder="Adresa ta de email" required />
            <button type="submit" aria-label="Pregătește înscrierea prin email"><ArrowUpRightIcon /></button>
          </form>
          <p className="newsletter-note" role="status">{emailPrepared ? 'Trimite cererea din aplicația ta de email pentru a finaliza înscrierea.' : 'Înscriere prin email. Fără spam, doar energie bună.'}</p>
        </Reveal>
      </section>
      <footer className="site-footer">
        <div className="footer-top"><a className="wordmark" href="#top"><HouseMark />FitHouse<span className="wordmark-period">®</span></a><p>Piese în care te simți tu.<br />O casă pentru stilul tău.</p><nav className="footer-links" aria-label="Navigație subsol"><a href="#shop">Colecție</a><a href="#story">Despre House</a><a href="#help">Întrebări frecvente</a><a href="mailto:hello@fithouse.store">Contact <ArrowUpRightIcon /></a></nav></div>
        <a className="footer-word" href="#top" aria-label="FitHouse, înapoi sus">FitHouse<span>↗</span></a>
        <div className="footer-bottom mono"><span>© 2026 FITHOUSE. ALL FITS WELCOME.</span><span>INDEPENDENT SPIRIT. EVERYDAY UNIFORM.</span><a href="#top">ÎNAPOI SUS ↑</a></div>
      </footer>
    </>
  )
}
