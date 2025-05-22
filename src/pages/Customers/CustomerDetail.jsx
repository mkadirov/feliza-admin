

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CustomerDetail() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const token = localStorage.getItem("userToken");
                const res = await axios.get(
                    `https://felizabackend.uz/api/customers/getCustomerById/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setData(res.data);
            } catch (err) {
                console.error("Xatolik:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomer();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="loading loading-spinner text-primary"></span>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="mt-10 text-center text-red-600">
                Mijoz topilmadi yoki xatolik yuz berdi.
            </div>
        );
    }

    return (
        <div className="max-w-5xl p-6 mx-auto mt-10 bg-white border border-gray-200 shadow-xl rounded-2xl">
            <div className="flex items-center gap-6 mb-8">
                <img
                    src={data.image}
                    className="object-cover border-4 border-indigo-500 rounded-full shadow w-28 h-28"
                />
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{data.fullName}</h1>
                    <p className="mt-1 text-sm text-gray-500">{data.username}</p>
                    <span
                        className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${data.enabled ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}
                    >
                        {data.enabled ? "Faol" : "Nofaol"}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 text-gray-700 md:grid-cols-2">
                <Info label="📞 Telefon" value={data.phoneNumber} />
                <Info label="🎂 Tug‘ilgan sana" value={data.birthDate || "—"} />
                <Info label="🚻 Jinsi" value={data.gender || "—"} />
                <Info label="🕒 Oxirgi ko‘rgan" value={data.lastSeen || "—"} />
                <Info label="📅 Qo‘shilgan sana" value={new Date(data.createdAt).toLocaleDateString()} />
                <Info label="💸 Cashback" value={data.cashback ?? 0} />
                <Info label="💰 Sotuvlar" value={data.saleSum ?? 0} />
                <Info label="🎖 Status" value={data.status?.statusName || "—"} />
                <Info label="🔑 Rollar" value={data.roles?.map(r => r.roleName).join(", ") || "—"} />
            </div>
        </div>
    );
}

function Info({ label, value }) {
    return (
        <div className="p-4 border border-gray-100 shadow-sm bg-gray-50 rounded-xl">
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="mt-1 text-lg font-semibold">{value}</p>
        </div>
    );
}

export default CustomerDetail;
