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
      {/* Header */}
      <div className="border-b-2 border-gray-800 pb-4">
        <h1 className="text-4xl font-bold text-gray-900">{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
          {data.personalInfo.email && <span>✉ {data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>☎ {data.personalInfo.phone}</span>}
          {data.personalInfo.address && <span>📍 {data.personalInfo.address}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm">{skill}</span>
            ))}
          </div>
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
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-6 -m-12 mb-6">
        <h1 className="text-4xl font-bold">{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-4 mt-2 text-violet-100">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.address && <span>{data.personalInfo.address}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div>
          <h2 className="text-2xl font-bold text-violet-600 mb-3 border-b-2 border-violet-600 pb-1">About Me</h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-violet-600 mb-3 border-b-2 border-violet-600 pb-1">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span key={i} className="px-4 py-2 bg-violet-100 text-violet-800 rounded-lg font-medium">{skill}</span>
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
          </div>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3 text-gray-300">SKILLS</h2>
            <div className="space-y-1">
              {data.skills.map((skill, i) => (
                <div key={i} className="text-sm">• {skill}</div>
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
      </div>
    </div>
  )
}

// Creative Template
function CreativeTemplate({ data }) {
  return (
    <div className="p-12 space-y-6">
      {/* Artistic Header */}
      <div className="relative">
        <div className="absolute -left-12 -top-8 w-24 h-24 bg-gradient-to-br from-pink-400 to-violet-600 rounded-full opacity-20"></div>
        <div className="absolute -right-8 top-0 w-16 h-16 bg-gradient-to-br from-indigo-400 to-blue-600 rounded-full opacity-20"></div>
        
        <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.address && <span>{data.personalInfo.address}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="bg-gradient-to-r from-violet-50 to-indigo-50 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">✨ About Me</h2>
          <p className="text-gray-700 leading-relaxed italic">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 Skills</h2>
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, i) => (
              <span 
                key={i} 
                className="px-4 py-2 bg-gradient-to-r from-violet-500 to-indigo-500 text-white rounded-full font-medium shadow-lg"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
