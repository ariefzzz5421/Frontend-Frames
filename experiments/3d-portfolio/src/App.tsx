import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';

const HIGGS = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2F';
const img = (file: string) => `${HIGGS}${file}&w=1280&q=85`;
const portrait = '/designs/3d-portfolio/portrait.webp';
const ornaments = [
  '/designs/3d-portfolio/moon.webp',
  '/designs/3d-portfolio/shape.webp',
  '/designs/3d-portfolio/lego.webp',
  '/designs/3d-portfolio/orbit.webp',
];
const previewIds = ['saltwake','phoenix-ignis','lumora','3d-portfolio','leon-vasari','orvante','lumora','saltwake','phoenix-ignis','orvante','3d-portfolio','leon-vasari','saltwake','lumora','phoenix-ignis','3d-portfolio','orvante','leon-vasari','phoenix-ignis','saltwake','lumora'];
const preview = (id: string) => `/media/${id}.webp`;
const services = [
  ['3D Modeling','Creation of detailed objects, characters, or environments tailored to a specific brief.'],
  ['Rendering','Custom lighting, textures, and materials make concepts tangible.'],
  ['Motion Design','Animation and graphics that bring movement to digital stories.'],
  ['Branding','Visual identities, from the mark to the complete brand system.'],
  ['Web Design','Thoughtful, responsive websites with clear hierarchy and interaction.'],
];
const projects = [
  {name:'Nextlevel Studio',category:'Client concept',images:[img('hf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png'),img('hf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png'),img('hf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png')]},
  {name:'Aura Brand Identity',category:'Personal concept',images:[img('hf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png'),img('hf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png'),img('hf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png')]},
  {name:'Solaris Digital',category:'Client concept',images:[img('hf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png'),img('hf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png'),img('hf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png')]},
];

function FadeIn({children,delay=0,className=''}:{children:ReactNode;delay?:number;className?:string}){
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced?false:{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.05,margin:'50px'}} transition={{duration:.7,delay,ease:[.25,.1,.25,1]}}>{children}</motion.div>;
}

function ContactButton({onClick}:{onClick:()=>void}){
  return <button className="contact-btn" onClick={onClick} type="button">Contact Me <ArrowUpRight size={17} aria-hidden="true" /></button>;
}

function MagneticPortrait(){
  const node = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  function move(e:React.MouseEvent<HTMLDivElement>){if(reduced||!node.current)return;const r=node.current.getBoundingClientRect();node.current.style.setProperty('--mx',`${(e.clientX-r.left-r.width/2)/3}px`);node.current.style.setProperty('--my',`${(e.clientY-r.top-r.height/2)/3}px`)}
  function reset(){node.current?.style.setProperty('--mx','0px');node.current?.style.setProperty('--my','0px')}
  return <div className="portrait-wrap" ref={node} onMouseMove={move} onMouseLeave={reset}><img src={portrait} alt="3D illustrated portrait of Jack, the portfolio's fictional creator" fetchPriority="high" /></div>;
}

function Hero({contact}:{contact:()=>void}){
  return <section className="hero" id="top">
    <nav className="hero-nav" aria-label="Portfolio navigation"><a href="#about">About</a><a href="#services">Price</a><a href="#projects">Projects</a><button type="button" onClick={contact}>Contact</button></nav>
    <div className="hero-heading-wrap"><FadeIn><h1 className="hero-heading">Hi, i'm jack</h1></FadeIn></div>
    <MagneticPortrait />
    <div className="hero-bottom"><FadeIn delay={.35}><p>A 3D creator driven by crafting striking and unforgettable projects.</p></FadeIn><FadeIn delay={.5}><ContactButton onClick={contact}/></FadeIn></div>
    <a className="collection-return" href="../../">← Frontend Frames</a>
  </section>;
}

function Marquee(){
  const section = useRef<HTMLElement>(null);
  const rowA = useRef<HTMLDivElement>(null),rowB = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(()=>{if(reduced)return;let raf=0;function update(){raf=0;if(!section.current)return;const y=section.current.getBoundingClientRect().top;const offset=(-y+innerHeight)*.3;rowA.current?.style.setProperty('--shift',`${Math.max(-180,Math.min(850,offset-200))}px`);rowB.current?.style.setProperty('--shift',`${Math.max(-850,Math.min(180,-offset+200))}px`)}function queue(){if(!raf)raf=requestAnimationFrame(update)}queue();addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);return()=>{removeEventListener('scroll',queue);removeEventListener('resize',queue);cancelAnimationFrame(raf)}},[reduced]);
  return <section className="marquee" ref={section} aria-label="Creative inspiration reel"><div className="marquee-label">SELECTED VISUAL WORLDS / 2026</div>{[previewIds.slice(0,11),previewIds.slice(11)].map((row,i)=><div className={`marquee-clip row-${i}`} key={i}><div className="marquee-track" ref={i===0?rowA:rowB}>{row.map((id,j)=><img key={id} src={preview(id)} loading="lazy" decoding="async" alt={`Design preview ${i*11+j+1}`} width="420" height="270"/>)}</div></div>)}</section>;
}

function RevealChar({char,index,total,progress}:{char:string;index:number;total:number;progress:MotionValue<number>}){
  const opacity=useTransform(progress,[index/total,(index+8)/total],[.2,1]);
  return <motion.span style={{opacity}} aria-hidden="true">{char}</motion.span>;
}

function About({contact}:{contact:()=>void}){
  const text="With more than five years of experience in design, I focus on branding, web design, and user experience. I enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!";
  const target=useRef<HTMLParagraphElement>(null),{scrollYProgress}=useScroll({target,offset:['start 0.8','end 0.2']});
  return <section className="about" id="about"><div className="ornaments" aria-hidden="true">{ornaments.map((src,i)=><img key={src} className={`ornament o-${i}`} src={src} alt="" loading="lazy" decoding="async"/>)}</div><div className="about-content"><FadeIn><h2 className="section-heading hero-heading">About me</h2></FadeIn><p className="about-text" ref={target} aria-label={text}>{[...text].map((char,i)=><RevealChar key={i} char={char} index={i} total={text.length} progress={scrollYProgress}/>)}</p><FadeIn><ContactButton onClick={contact}/></FadeIn></div></section>;
}

function Services(){return <section className="services" id="services"><div className="section-inner"><FadeIn><h2 className="section-heading">Services</h2></FadeIn><div className="service-list">{services.map(([name,description],i)=><FadeIn delay={i*.08} key={name}><div className="service-row"><span className="service-number">{String(i+1).padStart(2,'0')}</span><div><h3>{name}</h3><p>{description}</p></div></div></FadeIn>)}</div><p className="service-note">Rates depend on scope. This is a fictional portfolio concept and does not offer a booking service.</p></div></section>}

function Projects({open}:{open:(index:number)=>void}){return <section className="projects" id="projects"><div className="section-inner"><FadeIn><h2 className="section-heading hero-heading">Project</h2></FadeIn>{projects.map((project,i)=><div className="project-sticky" key={project.name}><article className="project-card" style={{top:`${95+i*28}px`,['--card-scale' as string]:1-(projects.length-1-i)*.03}}><div className="project-card-head"><span className="project-number">0{i+1}</span><div><span>{project.category}</span><h3>{project.name}</h3></div><button className="ghost-btn" type="button" onClick={()=>open(i)}>View project <ArrowUpRight size={16} aria-hidden="true"/></button></div><div className="project-image-grid"><div><img src={project.images[0]} alt={`${project.name} visual study one`} loading="lazy" decoding="async"/><img src={project.images[1]} alt={`${project.name} visual study two`} loading="lazy" decoding="async"/></div><img src={project.images[2]} alt={`${project.name} main visual study`} loading="lazy" decoding="async"/></div></article></div>)}</div></section>}

function App(){
  const [dialog,setDialog]=useState<'contact'|number|null>(null);
  const selected=typeof dialog==='number'?projects[dialog]:null;
  useEffect(()=>{if(dialog===null)return;function close(e:KeyboardEvent){if(e.key==='Escape')setDialog(null)}addEventListener('keydown',close);return()=>removeEventListener('keydown',close)},[dialog]);
  return <><main><Hero contact={()=>setDialog('contact')}/><Marquee/><About contact={()=>setDialog('contact')}/><Services/><Projects open={setDialog}/></main><footer className="site-foot"><a href="../../">← Frontend Frames</a><span>JACK IS A FICTIONAL PORTFOLIO CONCEPT · DESIGN REFERENCE: <a href="https://motionsites.ai/" target="_blank" rel="noopener noreferrer">MOTIONSITES AI © 2026</a></span></footer>{dialog!==null&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setDialog(null)}}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" type="button" onClick={()=>setDialog(null)} aria-label="Close dialog"><X/></button>{selected?<><span className="modal-kicker">PROJECT STUDY</span><h2 id="modal-title">{selected.name}</h2><img src={selected.images[2]} alt={`${selected.name} visual study`} /><p>This is a portfolio concept; no external live project URL was supplied.</p></>:<><span className="modal-kicker">CONTACT</span><h2 id="modal-title">Let's make something.</h2><p>Jack is a fictional creator in this design study. There is no live booking or contact endpoint.</p></>}<button className="ghost-btn" type="button" onClick={()=>setDialog(null)}>Back to portfolio</button></section></div>}</>;
}

export default App;
