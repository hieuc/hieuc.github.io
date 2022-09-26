/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { FaLinkedin, FaGithub, FaMugHot } from "react-icons/fa"

import "../styles/layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <>{children}</>
      <footer>
        <ul id="socials">
          <li className="linkedin">
            <a
              href="https://www.linkedin.com/in/hieu-chau-5aa0a51a8/"
              target="_blank"
              rel="noreferrer"
              className="linkedin"
            >
              <FaLinkedin className="fa" />
              <div>Linkedin</div>
            </a>
          </li>

          <li>
            <a
              href="https://github.com/hieuc"
              target="_blank"
              rel="noreferrer"
              className="github"
            >
              <FaGithub className="fa" />
              <div>Github</div>
            </a>
          </li>
        </ul>
        <div> © {new Date().getFullYear()} Hieu Chau </div>
        <span>
          Built with Gatsby and lots of{" "}
          <FaMugHot style={{ position: "relative", top: "-4px" }} />
        </span>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
