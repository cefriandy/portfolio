import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import myProfile from '../../assets/myprofile.png';
import './style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AboutPage: React.FC = () => {
  return (
    <div className="container">
      <div className="row align-items-center">
        <h1>About Me</h1>
        <div className="col-md-3 col-12 mb-3">
          <img
            src={myProfile}
            alt="Profile"
            className="rounded-circle img-fluid"
            style={{ height: '200px', width: '250px', marginRight: '5px' }}
          />
        </div>
        <div className="col-md-9 col-12 text-justify">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
            Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
            Duis sagittis ipsum. Praesent mauris.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
            Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
            Duis sagittis ipsum. Praesent mauris.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
            Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
            Duis sagittis ipsum. Praesent mauris.
          </p>
        </div>
      </div>
      <h2>The project description</h2>
      <div className="mt-3 text-justify">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
          Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
          Duis sagittis ipsum. Praesent mauris.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
          Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
          Duis sagittis ipsum. Praesent mauris.</p>
      </div>
      <div className="mt-5">
        <h2>Tech Stack</h2>
        <div className="row">
          <div className="col-md-3">
            <ul className="list-unstyled">
              <li className="d-flex align-items-center mb-2">
                <i className="bi bi-file-earmark-code-fill tech-icon"></i>
                <span className="ml-2">Java</span>
              </li>
              <li className="d-flex align-items-center mb-2">
                <i className="bi bi-box-seam tech-icon"></i>
                <span className="ml-2">Docker</span>
              </li>
              <li className="d-flex align-items-center mb-2">
                <i className="bi bi-file-code-fill tech-icon"></i>
                <span className="ml-2">Other</span>
              </li>
            </ul>
          </div>
          <div className="col-md-6 d-flex justify-content-arround">
            <ul className="list-unstyled">
              <li className="d-flex align-items-center mb-2">
                <i className="bi bi-file-code-fill tech-icon"></i>
                <span className="ml-2">React JS</span>
              </li>
              <li className="d-flex align-items-center mb-2">
                <i className="bi bi-cloud-fill tech-icon"></i>
                <span className="ml-2">Kubernetes</span>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <ul className="list-unstyled">
              <li className="d-flex align-items-center mb-2">
                <i className="bi bi-bootstrap-fill tech-icon"></i>
                <span className="ml-2">Bootstrap</span>
              </li>
              <li className="d-flex align-items-center mb-2">
                <i className="bi bi-database-fill tech-icon"></i>
                <span className="ml-2">PostgreSQL</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;