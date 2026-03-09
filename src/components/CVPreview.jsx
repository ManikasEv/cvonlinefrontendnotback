export default function CVPreview({ data, template }) {
  const templates = {
    basic: BasicTemplate,
    modern: ModernTemplate,
    professional: ProfessionalTemplate,
    creative: CreativeTemplate
  }

  const TemplateComponent = templates[template] || BasicTemplate

  return (
    <div className="h-full overflow-auto p-8 flex items-start justify-center bg-gray-50">
      <div className="w-full max-w-4xl bg-white shadow-xl" style={{ minHeight: '11in' }}>
        <TemplateComponent data={data} />
      </div>
    </div>
  )
}

// Basic Template
function BasicTemplate({ data }) {
  return (
    <div className="p-12 space-y-6">
      {/* Header with Photo */}
      <div className="flex gap-6 border-b-2 border-gray-800 pb-4">
        {data.personalInfo.profilePictureUrl && (
          <img 
            src={data.personalInfo.profilePictureUrl} 
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-800"
          />
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900">{data.personalInfo.fullName || 'Your Name'}</h1>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
            {data.personalInfo.email && <span>✉ {data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>☎ {data.personalInfo.phone}</span>}
            {data.personalInfo.address && <span>📍 {data.personalInfo.address}</span>}
          </div>
          {data.personalInfo.dateOfBirth && (
            <div className="mt-1 text-sm text-gray-600">🎂 {new Date(data.personalInfo.dateOfBirth).toLocaleDateString()}</div>
          )}
          {data.personalInfo.nationality && (
            <div className="mt-1 text-sm text-gray-600">🌍 {data.personalInfo.nationality}</div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {data.experience && data.experience.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Work Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700">{exp.company}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                </div>
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {exp.responsibilities.map((resp, ri) => (
                      <li key={ri} className="text-sm text-gray-700 flex gap-2">
                        <span>•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Skills</h2>
          <div className="space-y-2">
            {data.skills.map((skill, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-gray-700 font-medium">{typeof skill === 'string' ? skill : skill.name}</span>
                {typeof skill === 'object' && skill.level && (
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(level => (
                      <div
                        key={level}
                        className={`w-3 h-3 rounded-full ${level <= skill.level ? 'bg-gray-800' : 'bg-gray-300'}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Languages</h2>
          <div className="flex flex-wrap gap-2">
            {data.languages.map((lang, i) => (
              <span key={i} className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm">
                {typeof lang === 'string' ? lang : `${lang.name} (${lang.level})`}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Driving License */}
      {data.drivingLicense && data.drivingLicense.has_license && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Driving License</h2>
          <p className="text-gray-700">
            Categories: {data.drivingLicense.categories.join(', ') || 'None specified'}
          </p>
        </div>
      )}
    </div>
  )
}

// Modern Template
function ModernTemplate({ data }) {
  return (
    <div className="p-12 space-y-6">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-6 -m-12 mb-6 flex gap-6 items-center">
        {data.personalInfo.profilePictureUrl && (
          <img 
            src={data.personalInfo.profilePictureUrl} 
            alt="Profile" 
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
          />
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-bold">{data.personalInfo.fullName || 'Your Name'}</h1>
          <div className="flex flex-wrap gap-4 mt-2 text-violet-100">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.address && <span>{data.personalInfo.address}</span>}
          </div>
          {(data.personalInfo.dateOfBirth || data.personalInfo.nationality) && (
            <div className="flex gap-4 mt-2 text-sm text-violet-100">
              {data.personalInfo.dateOfBirth && <span>🎂 {new Date(data.personalInfo.dateOfBirth).toLocaleDateString()}</span>}
              {data.personalInfo.nationality && <span>🌍 {data.personalInfo.nationality}</span>}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div>
          <h2 className="text-2xl font-bold text-violet-600 mb-3 border-b-2 border-violet-600 pb-1">About Me</h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {data.experience && data.experience.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-violet-600 mb-3 border-b-2 border-violet-600 pb-1">Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp, i) => (
              <div key={i} className="border-l-4 border-violet-600 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{exp.position}</h3>
                    <p className="text-violet-700 font-medium">{exp.company}</p>
                  </div>
                  <p className="text-sm text-gray-600 bg-violet-50 px-3 py-1 rounded">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                </div>
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {exp.responsibilities.map((resp, ri) => (
                      <li key={ri} className="text-sm text-gray-700 flex gap-2">
                        <span className="text-violet-600">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-violet-600 mb-3 border-b-2 border-violet-600 pb-1">Skills</h2>
          <div className="space-y-3">
            {data.skills.map((skill, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-gray-700 font-medium flex-1">{typeof skill === 'string' ? skill : skill.name}</span>
                {typeof skill === 'object' && skill.level && (
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(level => (
                      <div
                        key={level}
                        className={`w-4 h-4 rounded ${level <= skill.level ? 'bg-violet-600' : 'bg-gray-300'}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-violet-600 mb-3 border-b-2 border-violet-600 pb-1">Languages</h2>
          <div className="flex flex-wrap gap-2">
            {data.languages.map((lang, i) => (
              <span key={i} className="px-4 py-2 bg-violet-100 text-violet-800 rounded-lg font-medium">
                {typeof lang === 'string' ? lang : `${lang.name} - ${lang.level}`}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Driving License */}
      {data.drivingLicense && data.drivingLicense.has_license && (
        <div>
          <h2 className="text-2xl font-bold text-violet-600 mb-3 border-b-2 border-violet-600 pb-1">Driving License</h2>
          <div className="flex flex-wrap gap-2">
            {data.drivingLicense.categories.map((cat, i) => (
              <span key={i} className="px-3 py-1 bg-violet-600 text-white rounded font-medium">{cat}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Professional Template
function ProfessionalTemplate({ data }) {
  return (
    <div className="flex h-full">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gray-800 text-white p-8 space-y-6">
        {/* Profile Picture */}
        {data.personalInfo.profilePictureUrl && (
          <div className="flex justify-center">
            <img 
              src={data.personalInfo.profilePictureUrl} 
              alt="Profile" 
              className="w-32 h-32 rounded-full object-cover border-4 border-white"
            />
          </div>
        )}

        <div>
          <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName || 'Your Name'}</h1>
          <div className="h-1 w-16 bg-white"></div>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg font-bold mb-3 text-gray-300">CONTACT</h2>
          <div className="space-y-2 text-sm">
            {data.personalInfo.email && <p className="break-words">{data.personalInfo.email}</p>}
            {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
            {data.personalInfo.address && <p>{data.personalInfo.address}</p>}
            {data.personalInfo.dateOfBirth && <p>🎂 {new Date(data.personalInfo.dateOfBirth).toLocaleDateString()}</p>}
            {data.personalInfo.nationality && <p>🌍 {data.personalInfo.nationality}</p>}
          </div>
        </div>

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3 text-gray-300">SKILLS</h2>
            <div className="space-y-2">
              {data.skills.map((skill, i) => (
                <div key={i}>
                  <div className="text-sm font-medium">{typeof skill === 'string' ? skill : skill.name}</div>
                  {typeof skill === 'object' && skill.level && (
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map(level => (
                        <div
                          key={level}
                          className={`h-1 flex-1 ${level <= skill.level ? 'bg-white' : 'bg-gray-600'}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3 text-gray-300">LANGUAGES</h2>
            <div className="space-y-1">
              {data.languages.map((lang, i) => (
                <div key={i} className="text-sm">
                  {typeof lang === 'string' ? lang : `${lang.name} - ${lang.level}`}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Driving License */}
        {data.drivingLicense && data.drivingLicense.has_license && (
          <div>
            <h2 className="text-lg font-bold mb-3 text-gray-300">DRIVING LICENSE</h2>
            <div className="flex flex-wrap gap-2">
              {data.drivingLicense.categories.map((cat, i) => (
                <span key={i} className="px-2 py-1 bg-gray-700 rounded text-xs">{cat}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="flex-1 p-8 space-y-6">
        {data.personalInfo.summary && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">PROFILE</h2>
            <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {data.experience && data.experience.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">EXPERIENCE</h2>
            <div className="space-y-4">
              {data.experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-700">{exp.company}</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                  </div>
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.responsibilities.map((resp, ri) => (
                        <li key={ri} className="text-sm text-gray-700 flex gap-2">
                          <span>•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Creative Template
function CreativeTemplate({ data }) {
  return (
    <div className="p-12 space-y-6">
      {/* Artistic Header */}
      <div className="relative flex gap-6 items-center">
        <div className="absolute -left-12 -top-8 w-24 h-24 bg-gradient-to-br from-pink-400 to-violet-600 rounded-full opacity-20"></div>
        <div className="absolute -right-8 top-0 w-16 h-16 bg-gradient-to-br from-indigo-400 to-blue-600 rounded-full opacity-20"></div>
        
        {data.personalInfo.profilePictureUrl && (
          <img 
            src={data.personalInfo.profilePictureUrl} 
            alt="Profile" 
            className="w-32 h-32 rounded-2xl object-cover shadow-2xl border-4 border-white"
          />
        )}
        
        <div className="flex-1">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            {data.personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.address && <span>{data.personalInfo.address}</span>}
          </div>
          {(data.personalInfo.dateOfBirth || data.personalInfo.nationality) && (
            <div className="flex gap-3 mt-2 text-sm text-gray-600">
              {data.personalInfo.dateOfBirth && <span>🎂 {new Date(data.personalInfo.dateOfBirth).toLocaleDateString()}</span>}
              {data.personalInfo.nationality && <span>🌍 {data.personalInfo.nationality}</span>}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="bg-gradient-to-r from-violet-50 to-indigo-50 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">✨ About Me</h2>
          <p className="text-gray-700 leading-relaxed italic">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {data.experience && data.experience.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">💼 Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp, i) => (
              <div key={i} className="bg-gradient-to-r from-violet-50 to-indigo-50 p-4 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                      {exp.position}
                    </h3>
                    <p className="text-gray-700 font-medium">{exp.company}</p>
                  </div>
                  <p className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                </div>
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {exp.responsibilities.map((resp, ri) => (
                      <li key={ri} className="text-sm text-gray-700 flex gap-2">
                        <span className="text-violet-600">✦</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 Skills</h2>
          <div className="space-y-3">
            {data.skills.map((skill, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="flex-1 font-medium text-gray-700">
                  {typeof skill === 'string' ? skill : skill.name}
                </span>
                {typeof skill === 'object' && skill.level && (
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(level => (
                      <div
                        key={level}
                        className={`w-4 h-4 rounded-full ${
                          level <= skill.level 
                            ? 'bg-gradient-to-r from-violet-500 to-indigo-500' 
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🌐 Languages</h2>
          <div className="flex flex-wrap gap-3">
            {data.languages.map((lang, i) => (
              <span 
                key={i} 
                className="px-4 py-2 bg-gradient-to-r from-violet-500 to-indigo-500 text-white rounded-full font-medium shadow-lg"
              >
                {typeof lang === 'string' ? lang : `${lang.name} (${lang.level})`}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Driving License */}
      {data.drivingLicense && data.drivingLicense.has_license && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🚗 Driving License</h2>
          <div className="flex flex-wrap gap-2">
            {data.drivingLicense.categories.map((cat, i) => (
              <span 
                key={i} 
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-lg font-bold shadow-lg"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
