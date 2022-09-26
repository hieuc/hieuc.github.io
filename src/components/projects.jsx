import React from "react"
import "../styles/projects.css"
import { FaGithub } from "react-icons/fa"
import { useStaticQuery, graphql } from "gatsby"

const Projects = () => {
  const data = useStaticQuery(query)

  return (
    <div id="projects-container">
      {data.dataJson.content.map((e, i) => {
        return (
          <div className="row">
            <div
              key={i}
              className="col-lg-6 d-flex align-items-stretch card-main"
            >
              <div className="card">
                <img
                  className="card-img"
                  src={e.demoImage.publicURL}
                  alt={e.name}
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
                  {e.links.map(link => (
                    <a
                      className="btn"
                      href={link.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
