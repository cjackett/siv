import { Tooltip } from './Tooltip'

export const DeliveredFailureCell = ({ delivered, failed }: { delivered?: unknown[]; failed?: unknown[] }) => {
  return (
    <>
      <Tooltip
        interactive={!!failed}
        placement="top"
        title={
          failed || delivered ? (
            <>
              {(failed as {
                'delivery-status': { message: string }
                id: string
                severity: string
              }[])?.map((event) => (
                <div key={event.id} style={{ fontSize: 14 }}>
                  <b>{event.severity} failure</b>: {event['delivery-status'].message.replace(/5.1.1 /g, '')}
                </div>
              ))}
              {(delivered as {
                id: string
                timestamp: number
              }[])?.map((event) => (
                <div key={event.id} style={{ fontSize: 14 }}>
                  {new Date(event.timestamp * 1000).toLocaleString()}
                </div>
              ))}
            </>
          ) : (
            ''
          )
        }
      >
        <td style={{ textAlign: 'center' }}>
          <span className="failed-events">
            {(failed as { severity?: string }[])?.filter((e) => e.severity === 'temporary').length ? '⚠️ ' : ''}
          </span>
          {delivered?.length}
          <span className="failed-events">
            {(failed as { severity?: string }[])?.filter(({ severity }) => severity === 'permanent').length ? ' X' : ''}
          </span>
        </td>
      </Tooltip>
      <style jsx>{`
        td {
          border: 1px solid #ccc;
          padding: 3px 10px;
          margin: 0;
        }

        .failed-events {
          color: red;
          font-weight: bold;
        }
      `}</style>
    </>
  )
}
