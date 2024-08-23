import React, { useState } from 'react';
import courseRequirements from '../components/courseRequirements.json'; // Adjust the path as necessary
import { Link } from 'react-router-dom';

const ViewCourseRequirement = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courseDetails, setCourseDetails] = useState(null);

  const handleCourseChange = (event) => {
    const course = event.target.value;
    setSelectedCourse(course);
    const details = courseRequirements.find((item) => item.course === course);
    setCourseDetails(details);
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-md-5 mb-3">
          <Link to="/enter-result" className="btn btn-primary btn-block">
            Enter O'Level result to see available Course
          </Link>
        </div>
      </div>

      <h2>View Course Requirements</h2>
      <div className="mb-3">
        <label htmlFor="courseSelect" className="form-label">
          Select a Course:
        </label>
        <select
          id="courseSelect"
          className="form-select"
          value={selectedCourse}
          onChange={handleCourseChange}
        >
          <option value="">Select Course</option>
          {courseRequirements.map((course) => (
            <option key={course.id} value={course.course}>
              {course.course}
            </option>
          ))}
        </select>
      </div>
      {courseDetails && (
        <div
          className="bg-white "
          style={{ maxHeight: '500px', overflow: 'auto' }}
        >
          <h3>Subject Requirements for {selectedCourse}</h3>
          <ul>
            <li>Mandatory:</li>
            <ul>
              {courseDetails.course_requirements.mandatory.map(
                (subject, index) => (
                  <li key={index}>{subject}</li>
                )
              )}
            </ul>

            {courseDetails.course_requirements.one_of && (
              <div className="div">
                <li>Choose one of:</li>
                <ul>
                  {courseDetails.course_requirements.one_of.map(
                    (subject, index) => (
                      <li key={index}>{subject}</li>
                    )
                  )}
                </ul>{' '}
              </div>
            )}
            {courseDetails.course_requirements.two_of && (
              <div className="div">
                <li>Choose two of:</li>
                <ul>
                  {courseDetails.course_requirements.two_of.map(
                    (subject, index) => (
                      <li key={index}>{subject}</li>
                    )
                  )}
                </ul>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewCourseRequirement;
