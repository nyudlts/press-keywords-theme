# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = 'keywords-jekyll-theme'
  spec.version       = '0.1.0'
  spec.authors       = ['librenauta', 'f']
  spec.email         = ['librenauta@sutty.nl', 'f@sutty.nl']

  spec.summary       = 'Keywords NYU Press'
  spec.homepage      = 'https://github.com/nyu-dss/keywords'
  spec.license       = 'Nonstandard'

  # La gemspec por defecto incluye todos los archivos que ponemos en
  # git, pero como no todos los que pongamos son necesarios para la
  # gema, hacemos nuestra propia lista de archivos.
  spec.files         = Dir['assets/**/*',
                           '_layouts/**/*',
                           '_includes/**/*',
                           '_sass/**/*',
                           '_data/**/*',
                           '_config.yml',
                           'LICENSE*',
                           'README*']

  spec.extra_rdoc_files = Dir['README.md', 'CHANGELOG.md', 'LICENSE.txt']
  spec.rdoc_options += [
    '--title', "#{spec.name} - #{spec.summary}",
    '--main', 'README.md',
    '--line-numbers',
    '--inline-source',
    '--quiet'
  ]

  spec.metadata = {
    'bug_tracker_uri'   => "#{spec.homepage}/issues",
    'homepage_uri'      => spec.homepage,
    'source_code_uri'   => spec.homepage,
    'changelog_uri'     => "#{spec.homepage}/blob/master/CHANGELOG.md",
    'documentation_uri' => "#{spec.homepage}/blob/master/README.md"
  }

  spec.add_runtime_dependency 'jekyll', '~> 4'
  spec.add_runtime_dependency 'jekyll-linked-posts', '~>0.3'
  spec.add_runtime_dependency 'jekyll-lunr'
  spec.add_runtime_dependency 'sutty-liquid'
  spec.add_runtime_dependency 'pry'
  spec.add_runtime_dependency 'jekyll-ignore-layouts'
  spec.add_runtime_dependency 'jekyll-seo-tag'
  spec.add_runtime_dependency 'jekyll-include-cache'
end
