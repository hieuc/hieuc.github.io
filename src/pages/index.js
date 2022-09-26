import React, { useState, useEffect, useRef } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import "../styles/index.css"
import NavBar from "../components/navbar"
import {
  FaRegFilePdf,
  FaAt,
  FaRegPaperPlane,
  FaCogs,
  FaArrowDown,
} from "react-icons/fa"
import { StaticImage } from "gatsby-plugin-image"
import Projects from "../components/projects"
import Resume from "../files/resume.pdf"
import IntroParticles from "../components/introparticles"

const IndexPage = () => {
  let avaRef = useRef(null)
  let [avaBlur, setAvaBlur] = useState(0)

  const avaAnimOnScroll = () => {
    const avaCurrentPosition = avaRef.current.getBoundingClientRect().top
    const windowHeight = window.innerHeight
    const target = windowHeight / 3
    const blur = Math.max(
      3,
      Math.sqrt(Math.abs(avaCurrentPosition - target) * 2)
    )
    setAvaBlur(blur)
  }

  useEffect(() => {
    window.addEventListener("scroll", avaAnimOnScroll)
  })

  return (
    <Layout>
      <div id="intro-shortcut-wrapper">
        <a id="intro-shortcut" href="#about">
          Scroll down
          <div>
            <FaArrowDown className="fa" />
          </div>
        </a>
      </div>

      <div id="intro">
        <IntroParticles />
        <div id="intro-name">
          <div>Hieu Chau</div>
          <h2> Software Developer</h2>
        </div>
        <div id="intro-extra"> </div>
      </div>
      <NavBar />
      <div id="about">
        <div ref={avaRef} id="ava">
          <StaticImage
            src="../images/profile.jpg"
            style={{ filter: `blur(${avaBlur}px)` }}
            alt="profile"
            id="ava-full"
          />
          <StaticImage
            src="../images/profile-nobg.png"
            id="ava-nobg"
            alt="profile"
          />
        </div>
        <h1>HEY THERE!</h1>

        <div className="separator" />

        <div id="about-info">
          <h3>
            My name is <b>Hieu</b>.
          </h3>
          <h3>
            Or you can call me <b>Victor</b>.
          </h3>
          <br />
          <h3>
            I graduated <b>with Honors</b> on <b>December 2021</b> from{" "}
            <b>University of Washington Tacoma </b>
            with a Bachelor's of Science in <b>Computer Science</b> and Systems.
          </h3>
          <br />
          <h3>
            I love working with data and bring them to life with visualizations.
            That's the <b>full-stack</b>!
          </h3>
          <br />
          <h3>
            Ultimately, I would hope to involve and make an impact in the
            research development of Machine Learning (NLP, CV) in the future,
            and how it can apply to the professional software development world.
          </h3>
        </div>
      </div>
      <div id="projects">
        <FaCogs className="fa" />
        <h1>PROJECTS</h1>
        <div className="separator" />
        <Projects />
      </div>
      <div id="contacts">
        <FaRegPaperPlane className="fa" />

        <h1>CONTACTS</h1>

        <div className="separator" />

        <div id="email">
          <h2>
            Feel free to shoot me a message if you want to keep in touch or chat
            about anything!
          </h2>
          <a
            href="mailto:hieu.q.chau@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <div className="contacts-container">
              <span>Email me</span>
              <FaAt className="fa" />
            </div>
          </a>
        </div>

        <div className="separator" />

        <div id="resume">
          <h2> Here is my résumé </h2>
          <a href={Resume} target="_blank" rel="noreferrer">
            <div className="contacts-container">
              <span>View</span>
              <FaRegFilePdf className="fa" />
            </div>
          </a>
        </div>
      </div>
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
