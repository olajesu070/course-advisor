import React, { useState, useEffect } from 'react';
import courseRequirements from '../components/courseRequirements.json'; // Adjust the path as necessary
import subjectsData from '../components/subject.json'; // Adjust the path as necessary
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const grades = ['A1', 'B2', 'B3', 'C4', 'C5', 'C6', 'D7', 'E8', 'F9'];

const EnterResult = () => {
  const [results, setResults] = useState(
    Array(9).fill({ subject: '', grade: '' })
  );
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    setSubjects(subjectsData);
  }, []);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newResults = results?.map((result, idx) =>
      idx === index ? { ...result, [name]: value } : result
    );
    setResults(newResults);
  };

  const handleCheckCourse = () => {
    const passedCourses = results.filter(
      (result) => grades.indexOf(result.grade) <= grades.indexOf('C6')
    );

    const hasA1 = results?.some((result) => result.grade === 'A1');

    if (passedCourses.length === 0 || !hasA1) {
      alert('You do not meet the minimum grade requirements.');
      return;
    }

    const passedSubjects = passedCourses?.map((course) =>
      course.subject.toLowerCase()
    );

    const matchedCourses = courseRequirements.filter((course) => {
      const courseRequirements = course.course_requirements;

      if (!courseRequirements) {
        return false; // Skip this course if requirements are undefined
      }

      const { mandatory, one_of, two_of } = courseRequirements;

      const mandatoryMet = mandatory.every((req) =>
        passedSubjects.includes(req.toLowerCase())
      );

      const oneOfMet = one_of?.some((req) =>
        passedSubjects.includes(req.toLowerCase())
      );

      const twoOfMet =
        passedSubjects?.filter((subject) =>
          two_of?.map((req) => req.toLowerCase()).includes(subject)
        ).length >= 2;

      return mandatoryMet && oneOfMet && twoOfMet;
    });

    if (matchedCourses.length > 0) {
      alert(
        `You qualify for the following courses: ${matchedCourses
          ?.map((course) => course.course)
          .join(', ')}`
      );
    } else {
      alert('You do not qualify for any courses based on your results.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-md-5">
          <Link
            to="/view-course-requirement"
            className="btn btn-secondary btn-block"
          >
            View Subject Requirement for a particular course
          </Link>
        </div>
      </div>

      <div className="results-section">
        <h2 className="text-center mb-4">Enter O'Level Results</h2>
        {results?.map((result, index) => (
          <div
            key={index}
            className="row mb-3"
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <div className="col-6 mb-2">
              <select
                className="form-select"
                name="subject"
                value={result.subject}
                onChange={(e) => handleChange(index, e)}
              >
                <option value="">Select Subject</option>
                {subjects?.map((subject) => (
                  <option key={subject.id} value={subject.name}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
            <div className=" col-6 mb-2">
              <select
                className="form-select"
                name="grade"
                value={result.grade}
                onChange={(e) => handleChange(index, e)}
              >
                <option value="">Select Grade</option>
                {grades?.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      <div
        className="check-course bg-primary rounded p-3 text-white text-center mt-3 mb-3"
        onClick={handleCheckCourse}
        style={{ cursor: 'pointer' }}
      >
        Check for Available Course
      </div>
    </div>
  );
};

export default EnterResult;
