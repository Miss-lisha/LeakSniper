import React from 'react';

type Props = {
    compromisedData: string[];
};

// 💡 Maps inconsistent terms from your breach data to clean keywords
const normalizeData = (items: string[]): string[] => {
    const keywordMap: Record<string, string> = {
        'email addresses': 'email',
        'emails': 'email',
        'email': 'email',
        'phone numbers': 'phone',
        'phone': 'phone',
        'passwords': 'password',
        'password': 'password',
        'usernames': 'username',
        'username': 'username',
        'tokens': 'token',
        'api keys': 'token',
        'access tokens': 'token',
        'locations': 'address',
        'addresses': 'address',
        'social security numbers': 'address',
        'full names': 'address',
        'personal info': 'address',
    };

    return items
        .map((item) => item.trim().toLowerCase())
        .map((key) => keywordMap[key])
        .filter((v): v is string => !!v);
};

const defaultChecklist: Record<string, string> = {
    password: 'Reset your passwords immediately on affected accounts and enable multi-factor authentication (MFA).',
    email: 'Check for unauthorized logins and reset credentials on major platforms.',
    phone: 'Enable SIM swap protection from your mobile carrier. Avoid SMS-based 2FA.',
    address: 'Monitor your credit activity and consider placing a fraud alert.',
    token: 'Revoke any leaked API tokens or session keys from developer settings.',
    username: 'Audit accounts using the same username. Consider using unique aliases.',
};

const RecoveryChecklist: React.FC<Props> = ({ compromisedData }) => {
    const normalizedData = normalizeData(compromisedData);

    const checklistItems = Object.entries(defaultChecklist).filter(([key]) =>
        normalizedData.includes(key)
    );

    return (
        <div className="bg-white dark:bg-gray-800 rounded-md shadow-md p-6 my-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                🔐 Security Remediation Plan
            </h3>
            {checklistItems.length === 0 ? (
                <p className="text-gray-700 dark:text-gray-300 italic">
                    No standard recovery steps detected for this breach. Please consult your provider or IT security team.
                </p>
            ) : (
                <ul className="space-y-3">
                    {checklistItems.map(([key, tip]) => (
                        <li key={key} className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                className="mt-1"
                                id={`checklist-${key}`}
                                title={tip}
                            />
                            <label
                                htmlFor={`checklist-${key}`}
                                className="text-sm text-gray-800 dark:text-gray-200"
                            >
                                {tip}
                            </label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RecoveryChecklist;
