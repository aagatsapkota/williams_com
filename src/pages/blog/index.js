import React, { useState, setState } from 'react'
import { Document, Page, pdfjs } from "react-pdf"

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'
import file from '../../pdf/somefile.pdf'

const BlogIndexPage = () => {

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }
  const goToPrevPage = () => {
    setPageNumber(pageNumber - 1)
  }
  const goToNextPage = () => {
    setPageNumber(pageNumber + 1)
  }
  return (
    <Layout>
      <div
        className="full-width-image-container margin-top-0"
        style={{
          backgroundImage: `url('/img/blog-index.jpg')`,
        }}
      >
        <h1
          className="has-text-weight-bold is-size-1"
          style={{
            boxShadow: '0.5rem 0 0 #f40, -0.5rem 0 0 #f40',
            backgroundColor: '#f40',
            color: 'white',
            padding: '1rem',
          }}
        >
          Latest Stories
        </h1>
      </div>
      <section className="section">
        <div className="container">
          <div className="content">
            <BlogRoll />
          </div>
        </div>
      </section>
      <section>
        <div>
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page
            {pageNumber}
            of
            {numPages}
          </p>
        </div>
        <nav>
          <button type="button" onClick={goToPrevPage}>Prev</button>
          <button type="button" onClick={goToNextPage}>Next</button>
        </nav>
      </section>
    </Layout>
  )
}

export default BlogIndexPage
