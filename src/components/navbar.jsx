import React, { useState, useRef, useEffect } from "react"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/navbar.css"

const NavBar = () => {
  const [selected, setSelected] = useState(0)
  const [sticky, setSticky] = useState("")

  const onScroll = () => {
    const currentScoll = window.pageYOffset
    // 1st: check the sticky status of navbar
    // assuming the nav bav is always at the start of page 2
    let isStick = currentScoll >= window.innerHeight
    setSticky(isStick ? "sticky" : "")

    // 2nd: check the current selected page of navbar
    const aboutOffset = document.querySelector("#about").offsetTop
    const projectsOffset = document.querySelector("#projects").offsetTop
    const contactsOffset = document.querySelector("#contacts").offsetTop
    //console.log(currentScoll, contactsOffset)
    let pad = -50

    if (currentScoll < aboutOffset + pad) {
      setSelected(0)
    } else if (currentScoll < projectsOffset + pad) {
      setSelected(1)
    } else if (
      window.innerHeight + window.scrollY >=
        document.body.scrollHeight + pad * 4 ||
      currentScoll >= contactsOffset
    ) {
      // scrolled to the end of page
      setSelected(3)
    } else {
      setSelected(2)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll)
  })

  return (
    <Navbar className={[sticky]} expand="sm">
      <Navbar.Brand href="#intro" className="py-0">
        Hieu Chau
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsie-navbar-nav" className="mr-2" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav activeKey={selected.toString()} className="">
          <Nav.Item>
            <Nav.Link eventKey="1" href="#about">
              About
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="2" href="#projects">
              Projects
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="3" href="#contacts">
              Contacts
            </Nav.Link>
          </Nav.Item>
          <Nav.Item title="Coming soon...">
            <Nav.Link eventKey="4" href="#contacts" disabled>
              Blogs
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
