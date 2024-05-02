import { z } from 'zod';
import { CurrencySchema, CryptoCurrencyResponseSchema, CryptoCurrenciesResponseSchema, PairSchema, CryptoPriceSchema } from '../schema/crypto-schema'


export type Currency = z.infer<typeof CurrencySchema>
export type Crytocurrencies = z.infer<typeof CryptoCurrenciesResponseSchema>
export type Cryptocurrency = z.infer<typeof CryptoCurrencyResponseSchema>
export type Pair = z.infer<typeof PairSchema>
export type CryptoPrice = z.infer<typeof CryptoPriceSchema>