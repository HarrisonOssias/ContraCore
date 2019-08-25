import React, { useContext, useState, useEffect } from 'react';
import ProjectContext from '../../context/project/projectContext';
import { Redirect } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const NavigationPage = () => {
  const projectContext = useContext(ProjectContext);

  const { getProjects } = projectContext;

  let projects;

  useEffect(() => {
    projects = getProjects();
  }, []);

  const [clicked, changeClicked] = useState({
    advance: false
  });

  const { advance } = clicked;

  const onClick = () => changeClicked({ advance: true });

  if (!advance) {
    return (
      <div className='container'>
        <div className='card card-nh set-color-white'>
          <h1>Start</h1>
          <div
            className='card card-md'
            style={{
              textAlign: 'center',
              width: '15rem',
              marginLeft: '22.5rem'
            }}
            onClick={onClick}
          >
            Build a new house
          </div>
        </div>
        <div className='card card-nh set-color-white'>
          <h1>Continue</h1>
          {projects ? (
            projects.map(project => {
              return (
                <div className='card card-md'>
                  <h2>{project.title}</h2>
                </div>
              );
            })
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    );
  } else {
    return <Redirect to='/' />;
  }
};

export default NavigationPage;
