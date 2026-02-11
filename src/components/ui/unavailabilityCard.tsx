'use client'

type Unavailability = {
    ID: number
    ServiceDate: string
    Reason: string
    Player: {
        Name: string
        MainRole?: {
            Code: string
        }
    }
}

type Props = {
    item: Unavailability
    onRemove?: (id: number) => void
}

export default function UnavailabilityCard({ item, onRemove }: Props) {
    const date = new Date(item.ServiceDate)

    return (
        <div className="
            p-4 rounded-2xl
            bg-linear-to-br from-white/20 to-white/5
            border border-white/20 backdrop-blur-xl
            flex justify-between items-center
            hover:scale-[1.01] transition
        ">
            <div>
                <div className="font-semibold text-white">
                    {item.Player?.Name || "Unknown"}
                </div>

                <div className="text-sm text-white/60">
                    {item.Player?.MainRole?.Code || "-"}
                </div>

                <div className="text-xs text-white/50 mt-1">
                    {date.toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}
                </div>

                {item.Reason && (
                    <div className="text-xs text-white/40 mt-1 italic">
                        {item.Reason}
                    </div>
                )}
            </div>

            {onRemove && (
                <button
                    onClick={() => onRemove(item.ID)}
                    className="
                        px-3 py-1 rounded-lg
                        bg-red-500/20 border border-red-500/30
                        text-red-300 text-sm
                        hover:bg-red-500/30 transition
                    "
                >
                    Remove
                </button>
            )}
        </div>
    )
}
