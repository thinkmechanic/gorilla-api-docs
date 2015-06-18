# Markdown
set :markdown_engine, :redcarpet
set :markdown,
  fenced_code_blocks: true,
  smartypants: true,
  disable_indented_code_blocks: true,
  prettify: true,
  tables: true,
  with_toc_data: true,
  no_intra_emphasis: true

# Assets
set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :images_dir, 'assets/images'
set :fonts_dir, 'asset/fonts'

# Directory Indexes
activate :directory_indexes

# Activate the syntax highlighter
activate :syntax

# Github pages require relative links
activate :relative_assets
set :relative_links, true

# Default API Version proxy
# proxy "/api", "/api/v1.html"

# Build Configuration
configure :build do
  activate :minify_css
  activate :minify_javascript
  # activate :relative_assets
  # activate :asset_hash
  activate :gzip
end
