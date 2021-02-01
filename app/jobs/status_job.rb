class StatusJob < ApplicationJob
  queue_as :default
  unique :until_executed, on_conflict: :log, lock_ttl: 1.minute

  def perform
    300.times do
      ActionCable.server.broadcast(
        'status',
        time: Time.current.strftime('%k:%M:%S')
      )

      sleep 1
    end
  end
end
