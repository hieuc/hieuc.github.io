import React, { useState } from "react"
import "../styles/projects.css"
import { FaGithub } from "react-icons/fa"
import { useStaticQuery, graphql } from "gatsby"

const Projects = () => {
  const data = useStaticQuery(query)
  // project that being expanded for more info.
  // index starts from 0, -1 is the inactive state
  const [active, setActive] = useState(-1)

  return (
    <div id="projects-container">
      {data.dataJson.content.map((e, i) => {
        return (
          <>
            <div className="row">
              <div
                key={"projects" + i}
                className="col-lg-6 d-flex align-items-stretch card-main"
              >
                <div className="card">
                  <img
                    className="card-img"
                    src={e.demoImage.publicURL}
                    alt={e.name}
                    onClick={() => {
                      setActive(i)
                    }}
                  />
                  <div className="card-body">
                    <div className="card-title">
                      {e.name}{" "}
                      {e.github ? (
                        <a href={e.github} target="_blank" rel="noreferrer">
                          <FaGithub className="fa" />
                        </a>
                      ) : null}
                    </div>
                    <div className="second-title">{e.tech}</div>
                    <p className="card-text">{e.description}</p>
                  </div>
                  <div>
                    {e.links.map((link, li) => (
                      <a
                        className="btn"
                        href={link.link}
                        target="_blank"
                        rel="noreferrer"
                        key={"link" + e.name + li}
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              id="modal"
              style={{ display: active === i ? "grid" : "none" }}
              onClick={() => {
                setActive(-1)
              }}
              key={"modal" + i}
            >
              <div
                className="modal-card"
                onClick={e => {
                  e.stopPropagation()
                }}
              >
                <div className="modal-header">
                  <div
                    className="xmark"
                    onClick={() => {
                      setActive(-1)
                    }}
                  ></div>
                  {e.name}
                </div>
                <div
                  className="modal-content"
                  dangerouslySetInnerHTML={{ __html: e.htmlContent }}
                ></div>
              </div>
            </div>
          </>
        )
      })}
    </div>
  )
}

const query = graphql`
  query {
    dataJson {
      content {
        name
        tech
        description
        github
        htmlContent
        demoImage {
          publicURL
        }
        links {
          name
          link
        }
      }
    }
  }
`

export default Projects
