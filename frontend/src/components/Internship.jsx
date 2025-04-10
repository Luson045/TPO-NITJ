import { CSVLink } from 'react-csv';
import React, { useState, useEffect } from "react";
import axios from "axios";

const Icon = ({ type }) => {
  const icons = {
    company: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    type: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M10 16l-4-4 4-4" />
        <path d="M14 8l4 4-4 4" />
      </svg>
    ),
    calendar: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    degree: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    department: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
    ),
    gender: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="10" r="7"></circle>
        <path d="M12 17v7"></path>
        <path d="M7 22h10"></path>
      </svg>
    ),
    money: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
      >
        <text
          x="4.5"
          y="20"
          fontSize="25"
          fontFamily="Arial, sans-serif"
          fill="currentColor"
        >
          ₹
        </text>
      </svg>
    ),

    student: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
    filter: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
      </svg>
    ),
    chevron: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    ),
    eye: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>

    )
  };

  return icons[type] || null;
};

// Stats card component
const LoadingSkeleton = () => (
  <div className="h-full w-full animate-pulse space-y-2">
    <div className="h-8 bg-current opacity-10 rounded-md w-24"></div>
    <div className="h-4 bg-current opacity-10 rounded-md w-32"></div>
    <div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
      -translate-x-full animate-[shimmer_2s_infinite] border-t border-white/10"
    ></div>
  </div>
);

const StatCard = ({
  value,
  label,
  bgColor,
  borderColor,
  textColor,
  icon,
  isLoading,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsTransitioning(true);
      const timer = setTimeout(() => setIsTransitioning(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div
      className={`
        ${bgColor} 
        ${borderColor} 
        rounded-lg 
        p-6 
        ${textColor} 
        shadow-md 
        relative 
        overflow-hidden
        transition-all 
        duration-300 
        ease-in-out
        ${isTransitioning ? "scale-[1.02]" : "scale-100"}
      `}
    >
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div
          className={`
            flex items-center justify-between
            transform 
            transition-all 
            duration-300 
            ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}
          `}
        >
          <div>
            <div className="text-2xl font-bold">
              {value === 0 ? "N/A" : value}
            </div>
            <div className={`${textColor}/90 text-sm`}>{label}</div>
          </div>
          <div
            className={`p-3 rounded-full border-2 ${bgColor.replace('border', 'bg').replace('-500', '-100')} ${bgColor.replace('border', 'text')} border-current`}
          >
            {icon}
          </div>
        </div>
      )}
    </div>
  );
};

const FilterSection = ({ filters, setFilters, handleClearFilters, applyFilters }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="bg-white shadow-md rounded-lg mb-8">
      <div
        className="p-4 flex justify-between items-center cursor-pointer border-b"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <div className="flex items-center space-x-2 text-gray-700">
          <Icon type="filter" />
          <h2 className="text-lg font-medium">Filter Internships</h2>
        </div>
        <div className={`transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`}>
          <Icon type="chevron" />
        </div>
      </div>

      {isFilterOpen && (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Icon type="company" />
                  Company Name
                </div>
              </label>
              <input
                type="text"
                name="company_name"
                value={filters.company_name}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                placeholder="e.g., Google"
              />
            </div>

            {/* Student Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Icon type="student" />
                  Student Name
                </div>
              </label>
              <input
                type="text"
                name="student_name"
                value={filters.student_name}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                placeholder="e.g., Raghav"
              />
            </div>

            {/* Batch */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Icon type="calendar" />
                  Batch
                </div>
              </label>
              <select
                name="batch"
                value={filters.batch}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All</option>
                {["2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"].map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Icon type="department" />
                  Department
                </div>
              </label>
              <select
                name="department"
                value={filters.department}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All</option>
                {[
                  "Biotechnology", "Chemical Engineering", "Civil Engineering", "Computer Science & Engineering",
                  "Data Science and Engineering", "Electrical Engineering", "Electronics & Communication Engineering",
                  "Electronics and VLSI Engineering", "Industrial and Production Engineering", "Information Technology",
                  "Instrumentation and Control Engineering", "Mathematics and Computing", "Mechanical Engineering",
                  "Textile Technology", "Structural and Construction Engineering", "Geotechnical and Geo-Environmental Engineering",
                  "Information Security", "Electric Vehicle Design", "Signal Processing and Machine Learning", "VLSI Design",
                  "Industrial Engineering and Data Analytics", "Manufacturing Technology With Machine Learning", "Data Analytics",
                  "Control and Instrumentation", "Machine Intelligence and Automation", "Design Engineering",
                  "Thermal and Energy Engineering", "Textile Engineering and Management", "Renewable Energy",
                  "Artificial Intelligence", "Power Systems and Reliability", "Finance", "Human Resource", "Marketing",
                  "Chemistry", "Mathematics", "Physics"
                ].map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Internship Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Icon type="type" />
                  Internship Type
                </div>
              </label>
              <select
                name="internship_type"
                value={filters.internship_type}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All</option>
                <option value="Tech">Tech</option>
                <option value="Non-Tech">Non-Tech</option>
                <option value="Tech+Non-Tech">Tech+Non-Tech</option>
              </select>
            </div>

            {/* Internship Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Icon type="clock" />
                  Internship Duration
                </div>
              </label>
              <select
                name="internship_duration"
                value={filters.internship_duration}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All</option>
                <option value="2m Intern">2 months</option>
                <option value="6m Intern">6 months</option>
                <option value="11m Intern">11 months</option>
              </select>
            </div>

            {/* Internship Offer Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Icon type="mode" />
                  Internship Offer Mode
                </div>
              </label>
              <select
                name="internship_offer_mode"
                value={filters.internship_offer_mode}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All</option>
                <option value="On-Campus">On-Campus</option>
                <option value="Off-Campus">Off-Campus</option>
              </select>
            </div>

            {/* Degree */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Icon type="degree" />
                  Degree
                </div>
              </label>
              <select
                name="degree"
                value={filters.degree}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All</option>
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech">M.Tech</option>
                <option value="MBA">MBA</option>
                <option value="M.Sc">M.Sc</option>
                <option value="PHD">PHD</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Icon type="gender" />
                  Gender
                </div>
              </label>
              <select
                name="gender"
                value={filters.gender}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Stipend */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Icon type="money" />
                  Stipend
                </div>
              </label>
              <select
                name="stipend"
                value={filters.stipend}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All</option>
                <option value="one">Less than 10k</option>
                <option value="two">10k - 20k</option>
                <option value="three">Greater than 20k</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition duration-200"
            >
              Clear Filters
            </button>
            <button
              onClick={applyFilters}
              className="px-4 py-2 text-white bg-custom-blue hover:bg-blue-700 rounded-md shadow-sm transition duration-200"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


const InternshipCard = ({ internship }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllStudents, setShowAllStudents] = useState(false);
  const {
    company_name = "",
    company_logo = "",
    internship_type = "",
    internship_offer_mode = "On-Campus",
    batch = "",
    degree = "",
    stipend = "0",
    role = "",
    internship_duration = "",
    shortlisted_students = [],
  } = internship;

  if (!internship || Object.keys(internship).length === 0) {
    return null;
  }

  const displayedStudents = showAllStudents
    ? shortlisted_students
    : shortlisted_students.slice(0, 4);

  const formattedStipend = stipend
    ? parseInt(stipend) >= 100000
      ? `₹ ${(parseInt(stipend) / 1000).toFixed(0)}K`
      : `₹ ${stipend}`
    : "N/A";

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Header Section */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center text-custom-blue text-lg font-semibold">
              {company_name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {company_name}
              </h3>
              <div className="flex flex-wrap items-center mt-1 gap-2 text-gray-600 text-sm">
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs">
                  {internship_type}
                </span>
                <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-md text-xs">
                  {internship_offer_mode}
                </span>
                <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-xs">
                  {(internship_duration).slice(0, 1) + " Months"}
                </span>
                <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs">
                  {batch}
                </span>
                <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded-md text-xs">
                  {degree}
                </span>
              </div>
              {role && (
                <p className="text-gray-600 text-sm mt-1">
                  <span className="font-medium">Role:</span> {role}
                </p>
              )}
            </div>
          </div>
          <div className="bg-custom-blue text-white text-sm font-medium px-3 py-1.5 rounded-full shadow-sm whitespace-nowrap">
            {formattedStipend}
          </div>
        </div>
      </div>

      {/* Students Section */}
      <div className="p-4">
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between py-2 px-3 cursor-pointer hover:bg-gray-50 rounded-md transition-colors"
        >
          <div className="flex items-center gap-2">
            <Icon type="student" />
            <span className="font-medium text-gray-700">
              Shortlisted Students ({shortlisted_students.length})
            </span>
          </div>
          <div
            className="text-gray-400 transition-transform duration-200"
            style={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <Icon type="chevron" />
          </div>
        </div>

        {isExpanded && (
          <div className="mt-3 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {displayedStudents.map((student, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 text-base font-medium">
                    {student?.name?.charAt(0) || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-800 text-base truncate">
                      {student?.name || "Unknown"}
                    </div>
                    <div className="text-sm flex flex-wrap items-center gap-2 text-gray-500">
                      <span>{student?.department || "N/A"}</span>
                      {student?.gender && (
                        <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                          {student.gender}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {shortlisted_students.length > 4 && (
              <button
                onClick={() => setShowAllStudents(!showAllStudents)}
                className="w-full mt-2 py-2 text-sm font-medium text-blue-600
                hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
              >
                {showAllStudents
                  ? "Show Less"
                  : `Show ${shortlisted_students.length - 4} More Students`}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const InternshipInsights = () => {
  const [filters, setFilters] = useState({
    company_name: "",
    student_name: "",
    internship_type: "",
    batch: "",
    degree: "",
    gender: "",
    department: "",
    stipend: "",
    internship_duration: "",
    internship_offer_mode: "",
  });

  const [internships, setInternships] = useState([]);
  const [insights, setInsights] = useState({
    totalStudentsSelected: 0,
    companiesVisited: 0,
    averageStipend: 0,
  });
  const [expandedRow, setExpandedRow] = useState(null);

  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("card"); 
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  const fetchInternships = async (updatedFilters = filters) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(
        Object.entries(updatedFilters).filter(([_, value]) => value !== "")
      ).toString();

      const apiUrl = `${import.meta.env.REACT_APP_BASE_URL}/internships/filter?${queryParams}`;
      const response = await axios.get(apiUrl);
      setInternships(response.data);

      const insightsUrl = `${import.meta.env.REACT_APP_BASE_URL}/internships/insights?${queryParams}`;

      const insightsResponse = await axios.get(insightsUrl);
      setInsights(insightsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const handleClearFilters = () => {
    setFilters({
      company_name: "",
      student_name: "",
      internship_type: "",
      batch: "",
      degree: "",
      gender: "",
      department: "",
      stipend: "",
      internship_duration: "",
      internship_offer_mode: "",
    });
    fetchInternships({});
  };

  const applyFilters = () => {
    fetchInternships(filters);
    setPage(1);
  };

  const sortedInternships = React.useMemo(() => {
    if (!internships.length) return [];

    return [...internships].sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === "stipend_high") {
        return parseInt(b.stipend || 0) - parseInt(a.stipend || 0);
      } else if (sortBy === "stipend_low") {
        return parseInt(a.stipend || 0) - parseInt(b.stipend || 0);
      } else if (sortBy === "duration_high") {
        return parseInt(b.internship_duration || 0) - parseInt(a.internship_duration || 0);
      } else if (sortBy === "duration_low") {
        return parseInt(a.internship_duration || 0) - parseInt(b.internship_duration || 0);
      }
      return 0;
    });
  }, [internships, sortBy]);

  const paginatedInternships = React.useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedInternships.slice(startIndex, endIndex);
  }, [sortedInternships, page]);

  const totalPages = Math.ceil(sortedInternships.length / itemsPerPage);

  const prepareExportData = () => {
    return sortedInternships.map(internship => ({
      'Company Name': internship.company_name,
      'Role': internship.role || 'N/A',
      'Internship Type': internship.internship_type || 'N/A',
      'Offer Mode': internship.internship_offer_mode || 'N/A',
      'Batch': internship.batch || 'N/A',
      'Degree': internship.degree || 'N/A',
      'Stipend (₹)': internship.stipend
        ? parseInt(internship.stipend) >= 1000
          ? `${(parseInt(internship.stipend) / 1000).toFixed(1)}K`
          : internship.stipend
        : "N/A",
      'Internship Duration': internship.internship_duration || 'N/A',
      'Students Count': internship.shortlisted_students?.length || 0,
      'Date': new Date(internship.createdAt).toLocaleDateString(),
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-900 tracking-tight mb-2">
            Internship{" "}
            <span className="bg-custom-blue text-transparent bg-clip-text">
              Insights
            </span>
          </h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard
            value={insights.totalStudentsSelected}
            label="Students Selected"
            bgColor="bg-[#ffead6]"
            borderColor="border-2 border-[#e4bca0]"
            textColor="text-[#b87748]"
            icon={<Icon type="student" />}
            isLoading={loading}
          />
          <StatCard
            value={insights.companiesVisited}
            label="Companies Visited"
            bgColor="bg-[#f3e5fa]"
            borderColor="border-2 border-[#d3b8e3]"
            textColor="text-[#a578c0]"
            icon={<Icon type="company" />}
            isLoading={loading}
          />
          <StatCard
            value={
              insights.averageStipend && insights.averageStipend !== "N/A"
                ? `₹${insights.averageStipend} / month`
                : "N/A"
            }
            label="Average Stipend"
            bgColor="bg-[#d7f7e5]"
            borderColor="border-2 border-[#b3d4c2]"
            textColor="text-[#6a987b]"
            icon={<Icon type="money" />}
            isLoading={loading}
          />
        </div>


        {/* Filters Section */}
        <FilterSection
          filters={filters}
          setFilters={setFilters}
          handleClearFilters={handleClearFilters}
          applyFilters={applyFilters}
        />

        {/* Controls Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <span className="text-gray-500 text-sm">View:</span>
            <div className="flex bg-gray-100 rounded-md p-1">
              <button
                onClick={() => setView("card")}
                className={`px-3 py-1 rounded-md text-sm ${view === "card"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-200"
                  }`}
              >
                Cards
              </button>
              <button
                onClick={() => setView("table")}
                className={`px-3 py-1 rounded-md text-sm ${view === "table"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-200"
                  }`}
              >
                Table
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="stipend_high">Highest Stipend</option>
              <option value="stipend_low">Lowest Stipend</option>
              <option value="duration_high">Highest Duration</option>
              <option value="duration_low">Shortest Duration</option>
            </select>

            {/* Export Button */}
            <CSVLink
              data={prepareExportData()}
              filename={`internships-${new Date().toLocaleDateString()}.csv`}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md shadow-sm text-sm font-medium flex items-center ml-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Export
            </CSVLink>
          </div>
        </div>

        {/* Internships List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : view === "card" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedInternships.length > 0 ? (
              paginatedInternships.map((internship, index) => (
                <InternshipCard key={index} internship={internship} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 px-4 text-center">
                <h3 className="mt-4 text-lg font-medium text-gray-900">No internships found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-7 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Batch
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Degree
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stipend
                    </th>
                    <th className="px-11 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Students
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedInternships.length > 0 ? (
                    paginatedInternships.map((internship, index) => (
                      <React.Fragment key={internship._id || index}>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-50 rounded-md flex items-center justify-center text-blue-600 font-semibold">
                                {internship.company_name.charAt(0)}
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-800">
                                  {internship.company_name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {internship.role || "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs">
                              {internship.internship_type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {internship.batch}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {internship.degree}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="bg-custom-blue text-white text-xs font-medium px-2.5 py-1 rounded-full">
                              ₹{internship.stipend?.toLocaleString() || "0"}
                            </span>
                          </td>
                          <td className="px-12 py-4 whitespace-nowrap text-sm text-gray-600">
                            {(internship.internship_duration).slice(0, 1)} Months
                          </td>
                          <td className="px-9 py-4 whitespace-nowrap text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <span>{internship.shortlisted_students.length}</span>
                              {internship.shortlisted_students.length > 0 && (
                                <button
                                  onClick={() =>
                                    setExpandedRow(expandedRow === internship._id ? null : internship._id)
                                  }
                                  className="text-blue-600 hover:text-blue-800"
                                  title="View Students"
                                >
                                  <Icon type="eye" />
                                </button>

                              )}
                            </div>
                          </td>
                        </tr>
                        {expandedRow === internship._id && (
                          <tr>
                            <td colSpan="8" className="px-0 py-0">
                              <div className="m-2 rounded-lg bg-gray-50 border border-gray-200 overflow-hidden shadow-sm">
                                <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                                  <h4 className="font-medium text-custom-blue">Shortlisted Students</h4>
                                  <button
                                    onClick={() => setExpandedRow(null)}
                                    className="text-blue-600 hover:text-blue-800 rounded-full p-1 hover:bg-blue-100"
                                  >
                                    <Icon type="close" />
                                  </button>
                                </div>
                                <div className="p-4">
                                  {internship.shortlisted_students.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                      {internship.shortlisted_students.map((student, i) => (
                                        <div
                                          key={i}
                                          className="flex items-center bg-white p-3 rounded-md border border-gray-200 shadow-sm hover:shadow-md hover:bg-blue-50 transition duration-200 ease-in-out"
                                        >
                                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold mr-3">
                                            {student.name?.charAt(0) || "S"}
                                          </div>
                                          <div className="text-sm">
                                            <p className="font-medium text-gray-800">{student.name}</p>
                                            <p className="text-xs text-gray-500">{student?.department} - {student.gender}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-gray-500 text-center py-4">No students in the shortlist</p>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}

                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <h3 className="mt-4 text-lg font-medium text-gray-900">No internships found</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Try adjusting your filters or search criteria
                          </p>
                          <button
                            onClick={handleClearFilters}
                            className="mt-4 px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
                          >
                            Clear Filters
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pages */}
        {sortedInternships.length > itemsPerPage && (
          <div className="flex items-center justify-between bg-white px-4 py-3 mt-6 rounded-lg shadow-sm">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${page === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
              >
                Previous
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${page === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(page - 1) * itemsPerPage + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(page * itemsPerPage, sortedInternships.length)}
                  </span>{" "}
                  of <span className="font-medium">{sortedInternships.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${page === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-500 hover:bg-gray-50"
                      }`}
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {/* Page numbers */}
                  {[...Array(totalPages)].map((_, idx) => {
                    const pageNumber = idx + 1;
                    const showPage =
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= page - 1 && pageNumber <= page + 1);

                    if (!showPage && pageNumber === page - 2) {
                      return (
                        <span
                          key={`ellipsis-start`}
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                        >
                          ...
                        </span>
                      );
                    }

                    if (!showPage && pageNumber === page + 2) {
                      return (
                        <span
                          key={`ellipsis-end`}
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                        >
                          ...
                        </span>
                      );
                    }

                    if (!showPage) return null;

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setPage(pageNumber)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === pageNumber
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                          }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${page === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-500 hover:bg-gray-50"
                      }`}
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default InternshipInsights;