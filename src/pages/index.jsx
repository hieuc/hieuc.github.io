import React, { useState } from "react"

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
import { useInView } from "react-intersection-observer"
import { StaticImage } from "gatsby-plugin-image"
import Projects from "../components/projects"
import Resume from "../files/resume.pdf"
import IntroParticles from "../components/introparticles"
import Fname from "../components/fname"

const IndexPage = () => {
  const [contactRef, contactInView] = useInView({
    threshold: 0.4,
  })

  const [emailRef, emailInView] = useInView({
    threshold: 0.3,
  })

  const [resumeRef, resumeInView] = useInView({
    threshold: 0.3,
  })

  const [aboutRef, aboutInView] = useInView({
    threshold: 0.3,
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
          <div style={{ display: "inline-flex" }}>
            <Fname scale={1} />{" "}
            <div style={{ position: "relative" }}>
              <span id="lname">Chau</span>
            </div>
          </div>
          <br />
          <h2 id="title"> Software Developer</h2>
        </div>
        <div id="intro-extra"> </div>
      </div>
      <NavBar />
      <div id="about">
        <div id="ava">
          <StaticImage
            src="../images/profile.jpg"
            alt="profile"
            id="ava-full"
          />
        </div>
        <h1>HEY THERE!</h1>

        <div className="separator" />

        <div ref={aboutRef} id="about-info">
          <h3 className={"hidden " + (aboutInView ? "show" : "")}>
            My name is <b>Hieu</b> ("Hew").
          </h3>
          <h3
            style={{ transitionDelay: "0.50s" }}
            className={"hidden " + (aboutInView ? "show" : "")}
          >
            Or you can call me <b>Victor</b>.
          </h3>
          <br />
          <br />
          <br />
          <h3
            style={{ transitionDelay: "1s" }}
            className={"hidden " + (aboutInView ? "show" : "")}
          >
            I graduated <b>with Honors</b> on <b>December 2021</b> from{" "}
            <b>University of Washington Tacoma </b>
            with a Bachelor's of Science in <b>Computer Science</b> and Systems.
          </h3>
          <br />
          <h3
            style={{ transitionDelay: "1.25s" }}
            className={"hidden " + (aboutInView ? "show" : "")}
          >
            At the moment, I'm looking to gain professional experience as a{" "}
            <b>full-stack</b> software engineer.
          </h3>
          <br />
          <h3
            style={{ transitionDelay: "1.5s" }}
            className={"hidden " + (aboutInView ? "show" : "")}
          >
            Ultimately, I would hope to involve and make an impact in the
            research development of Machine Learning (NLP, CV) in the future,
            and how it can apply to the practical software development world.
          </h3>
        </div>
      </div>
      <div id="projects">
        <FaCogs className="fa" />
        <h1>PROJECTS</h1>
        <div className="separator" />
        <Projects />
      </div>

      <div ref={contactRef} id="contacts">
        <FaRegPaperPlane
          className={
            "fa paperplane " + (contactInView ? "paperplane-anim" : "")
          }
        />

        <h1>CONTACTS</h1>

        <div className="separator" />

        <div
          ref={emailRef}
          id="email"
          className={"hidden " + (emailInView ? "show" : "")}
        >
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

        <div
          ref={resumeRef}
          id="resume"
          className={"hidden " + (resumeInView ? "show" : "")}
        >
          <h2> Here is my résumé </h2>
          <a href={Resume} target="_blank" rel="noreferrer">
            <div className="contacts-container">
              <span>View</span>
              {<FaRegFilePdf className="fa" />}
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
