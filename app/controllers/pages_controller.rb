class PagesController < ApplicationController
  def homepage
    StatusJob.perform_later
  end
end
